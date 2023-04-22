const express = require('express')
const router = express()
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken");
const { getUsers, registerUser, loginUser, logoutUser } = require("../controllers/loginController");
const { getUserInfo } = require('../Controllers/controllers');

//user logged in routes

router.post("/login", loginUser)
router.post('/register', registerUser)
router.get('/logout', logoutUser);

router.use(verifyIsLoggedIn);
router.get('/info', getUserInfo);




module.exports = { router };