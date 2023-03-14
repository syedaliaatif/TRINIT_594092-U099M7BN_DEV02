const express=require('express')
const router = express()
const { verifyIsLoggedIn } = require("../middleware/verifyAuthToken");
const {getUsers, registerUser, loginUser} = require("../controllers/loginController")

//user logged in routes
router.use(verifyIsLoggedIn);

router.post("/login",loginUser)
router.post('/register', registerUser)




module.exports= {router};