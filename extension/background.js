function getHostName(url) {
    const newURL = new URL(url);
    return newURL.host;
}

async function getHostData(url, args, callBackFun) {
    url = new URL(url);
    const host = url.host;
    const dataAttr = ['hits', 'total'];
    let data = {};
    dataAttr.forEach(async (attr) => {

        const response = await chrome.storage.session.get([host + '/' + attr]);
        console.log(`Response for ${attr} `, response);
        if (response[host + '/' + attr] === undefined) data[attr] = 0;
        else data[attr] = response[host + '/' + attr];
    });
    console.log(`Data : `, data);
    callBackFun(data, args);
}

async function updateHostData(url, curData) {
    console.log(`curData: `, curData);
    getHostData(url, { url: url, curData: curData }, (data, { url, curData }) => {
        url = new URL(url);
        const host = url.host;
        const dataAttr = ['hits', 'total'];
        console.log(data);
        console.log(`curData in Callback Function: `, curData)

        dataAttr.forEach((attr) => {
            const val = Number(curData[attr] + data[attr]);
            console.log(`Value corres`)
            chrome.storage.session.set({ [host + '/' + attr]: val });
        });
    });

}


async function sendPostRequest(emmission, url, email, numRetries) {
    try {
        const res = await fetch('http://localhost:3004/api', {
            method: 'POST',
            body: JSON.stringify({
                emmission: emmission,
                host: url,
                userEmail: email

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        console.log(res);

    } catch (error) {
        if (numRetries === 0) {
            console.log(error);
            return;
        }
        sendPostRequest(emmission, url, email, numRetries - 1);
    }
    return;
}
function getTabId(tabId) {
    return JSON.stringify(tabId);
}
function testUrl(url) {
    var regEx = /https:\/\/(.*)/;
    return regEx.test(url);
}
chrome.tabs.onUpdated.addListener((tabId, changeMessage, tab) => {
    if (tab.url !== undefined && changeMessage.status === "complete" && testUrl(tab.url)) {
        chrome.identity.getProfileUserInfo().then((info) => {
            console.log(`User email is ${info.email}`);
            chrome.tabs.sendMessage(tabId, {
                message: 'get-emmission'
            }).then(async (response) => {
                const url = new URL(tab.url);
                console.log(url.host);
                console.log(`Emmission value calculated in ${tab.id} to be ${response.emmission}`);
                console.log(`URL for the website is ${url.host}`);
                sendPostRequest(response.emmission, url.host, info.email, 3);
                const curData = { total: response.emmission, hits: 1 };
                const data = {};
                const dataAttrs = ['total', 'hits'];
                for (let attr of dataAttrs) {
                    const response = await chrome.storage.session.get([url.host + '/' + attr]);
                    if (response[url.host + '/' + attr]) data[attr] = response[url.host + '/' + attr];
                    else data[attr] = 0;
                }
                console.log(`Data: `, data);
                console.log(`curData: `, curData);
                for (let attr of dataAttrs) {
                    const val = data[attr] + curData[attr];
                    console.log(`Final value for ${attr}: ${val}`)
                    chrome.storage.session.set({ [url.host + '/' + attr]: val });
                }

            })




        });

    }
});




chrome.action.onClicked.addListener((tab) => {

    console.log("clicked");


    if (tab.url && testUrl(tab.url)) {
        chrome.tabs.sendMessage(tab.id, { message: 'get-tab-status' }, async (response) => {
            console.log(`Tab Status for tab ${tab.id}: ${response}`);
            if (response === false) {
                let hostData = {};
                const dataAttrs = ['hits', 'total'];
                const url = new URL(tab.url);
                for (let attr of dataAttrs) {
                    const response = await chrome.storage.session.get([url.host + '/' + attr]);
                    if (response[url.host + '/' + attr]) hostData[attr] = response[url.host + '/' + attr];
                    else hostData[attr] = 0;
                }
                chrome.tabs.sendMessage(tab.id, {
                    message: 'show-extension-frontend',
                    totalEmmission: hostData['total'],
                    averageEmmission: hostData['total'] / hostData['hits'],
                    totalHits: hostData['hits'],
                    host: url.host
                })

            }

            else {
                console.log(`Frontend was already being shown so no need to show it again for tab ${tab.id}`);
            }
        });
    }

});



//console.log(response);
