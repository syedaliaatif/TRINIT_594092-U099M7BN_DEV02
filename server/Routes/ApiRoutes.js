const Router = require('express').Router();

Router.post('/', (req, res, next) => {
    console.log(req.body);
    console.log("Request Received");
    res.send("Request received");
})

module.exports = Router; 