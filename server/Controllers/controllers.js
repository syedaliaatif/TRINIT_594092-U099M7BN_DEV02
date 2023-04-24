const User = require("../Model/UserModel");
const request = require('request');
require('dotenv').config();

const getSearchResult = async (req, res, next) => {
    try {
        const apiURL = process.env.GOOGLE_SEARCH_API_URL;
        const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
        const apiCx = process.env.GOOGLE_SEARCH_API_CX;
        const searchedWord = req.body.searchedWord.replaceAll(' ', '+');
        console.log(`Searched Word: ${searchedWord}`)
        const queryObject = {
            key: apiKey,
            cx: apiCx,
            q: searchedWord
        }
        request({
            url: apiURL + "?",
            qs: queryObject
        }, async function (error, response, body) {
            if (error) {
                console.log('error:', error);
                res.status(500).json({ message: 'api-limit-reached' });
                // Print the error if one occurred

            } else if (response && body) {
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                body = JSON.parse(body);
                body = body.items;
                var hostList = body.map((result) => {
                    var url = new URL(result.link);

                    return url.hostname;
                });
                //console.log(hostList);
                var hostEmmission = [];
                for (let host of hostList) {
                    const forCurHost = await User.aggregate([
                        {
                            $match: { host: host },
                        },
                        {
                            $group: {
                                _id: "$host",
                                totalEmmission: { $sum: "$emmission" },
                                totalHits: { $sum: "$hits" },

                            }
                        },
                        {
                            $project: {

                                averageEmmission: { $divide: ["$totalEmmission", "$totalHits"] }
                            }
                        }
                    ]);
                    console.log(forCurHost);

                    if (forCurHost.length > 0) hostEmmission.push(parseFloat(forCurHost[0].averageEmmission));
                    else hostEmmission.push(0.0);

                }
                console.log(hostEmmission);
                const finalResult = body.map((result, idx) => {
                    return {
                        ...result,
                        averageEmmission: hostEmmission[idx]
                    };
                });

                res.status(200).json({
                    message: 'api-results-fetched',
                    result: finalResult
                }); // Print JSON response.
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'api-limit-reached'
        });

    }

}
const getUserData = async (req, res, next) => {

    try {
        const numResults = req.query.numResults || 10;
        const userEmail = req.user.email;
        const userData = await User.aggregate([
            {
                $match: { userEmail: userEmail }
            },
            {
                $project: {
                    userEmail: 1,
                    host: 1,
                    totalEmmission: "$emmission",
                    totalHits: "$hits",
                    averageEmmission: { $divide: ["$emmission", "$hits"] }
                }
            },
            {
                $sort: {
                    averageEmmission: 1
                }
            },
            {
                $limit: numResults
            }
        ]);

        res.status(200).json(userData);

    } catch (error) {
        next(error);
    }
}

const updateUserData = async (req, res, next) => {

    try {
        console.log(req.body);
        const emmission = parseFloat(req.body.emmission);
        const userEmail = req.body.userEmail;
        const hits = 1;
        const host = req.body.host;
        const userData = await User.findOne({ userEmail: userEmail, host: host });
        console.log(userData);
        if (userData) {
            userData.emmission = parseFloat(Number(userData.emmission)) + emmission;
            userData.hits += 1;
            userData.save();
            res.status(201).send('User and host were already present so updated the data');
        }
        else {
            const user = new User({
                userEmail: userEmail,
                emmission: emmission,
                hits: 1,
                host: host
            });
            user.save();
            res.status(201).send('Corresponding user and host data was not present so created new.');
        }
    }
    catch (error) {
        next(error);
    }

}

const getWebsitesData = async (req, res, next) => {
    const numResults = 10;
    const numPage = req.query.numPage || 1;
    const skipResult = (numPage - 1) * numResults;
    console.log(req.query);
    console.log(decodeURI(req.query))
    console.log(decodeURIComponent(req.query.email));
    let sorting_rule = {};
    if (req.query.sort_by_emmission) {
        sorting_rule = { averageEmmission: 1 }
    }
    if (req.query.sort_by_hits) {
        sorting_rule = { totalHits: -1 }
    }
    var curUser = ``;

    if (req.query.email) {

        curUser = "^" + decodeURIComponent(req.query.email) + "$";
    }
    try {

        const websiteData = await User.aggregate([
            {
                $match: { userEmail: new RegExp(curUser) }
            },
            {
                $sort: { host: 1 }
            },
            {
                $group: {
                    _id: "$host",
                    totalEmmission: { $sum: "$emmission" },
                    totalHits: { $sum: "$hits" },

                }
            },
            {

                $project: {
                    host: 1,
                    totalEmmission: 1,
                    totalHits: 1,
                    averageEmmission: { $divide: ["$totalEmmission", "$totalHits"] }
                }
            },
            {
                $sort: sorting_rule
            },
            {
                $skip: skipResult

            },
            {
                $limit: numResults
            }
        ])
        console.log(websiteData);
        console.log(websiteData[0].totalEmmission);
        res.status(200).json(websiteData);


    } catch (error) {
        next(error);
    }
}

const queryWebsiteData = async (req, res, next) => {

    try {
        const host = req.body.host;
        let curUser = '';
        if (req.body.email) {
            curUser = `^${req.body.email}` + "$";
        }

        const result = await User.aggregate([
            {
                $match: { host: new RegExp(`.*${host}.*`), userEmail: new RegExp(curUser) }
            },
            {
                $group: {
                    _id: "$host",
                    totalEmmission: { $sum: "$emmission" },
                    totalHits: { $sum: "$hits" },
                }
            },
            {
                $project: {
                    host: "$_id",
                    totalEmmission: 1,
                    totalHits: 1,
                    averageEmmission: { $divide: ["$totalEmmission", "$totalHits"] }
                }

            },
            {
                $sort: { averageEmmission: 1, host: 1 }
            }

        ]);

        console.log(result);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getUserInfo = async (req, res, next) => {
    try {
        return res.json({
            user: req.user
        });
    } catch (error) {
        next(error);
    }
}
module.exports = { updateUserData, getWebsitesData, getUserData, getSearchResult, queryWebsiteData, getUserInfo }; 