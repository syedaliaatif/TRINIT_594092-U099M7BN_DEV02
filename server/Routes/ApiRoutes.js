const { updateUserData, getWebsitesData, getUserData, getSearchResult, queryWebsiteData } = require('../Controllers/controllers');
const User = require('../Model/UserModel');

const Router = require('express').Router();
Router.get('/', getUserData);
Router.post('/', updateUserData);
Router.get('/websites', getWebsitesData);
Router.post('/websites', queryWebsiteData);
Router.post('/search', getSearchResult);

module.exports = Router; 