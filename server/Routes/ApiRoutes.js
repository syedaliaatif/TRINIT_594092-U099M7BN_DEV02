const { updateUserData, getWebsitesData, getUserData, getSearchResult } = require('../Controllers/controllers');
const User = require('../Model/UserModel');

const Router = require('express').Router();
Router.get('/', getUserData);
Router.post('/', updateUserData);
Router.get('/websites', getWebsitesData);
Router.get('/search', getSearchResult);

module.exports = Router; 