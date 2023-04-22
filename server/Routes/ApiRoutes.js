
const { updateUserData, getWebsitesData, getUserData, getSearchResult, queryWebsiteData, getUserInfo } = require('../Controllers/controllers');
const { verifyIsLoggedIn } = require('../middleware/verifyAuthToken');
const User = require('../Model/UserModel');
const { router } = require('./loginRoutes');
//const router = require('./loginRoutes');


const Router = require('express').Router();

Router.use('/auth', router);

Router.post('/', updateUserData);
Router.get('/websites', getWebsitesData);
Router.post('/websites', queryWebsiteData);
Router.post('/search', getSearchResult);

Router.use(verifyIsLoggedIn);
Router.get('/', getUserData);


module.exports = Router; 