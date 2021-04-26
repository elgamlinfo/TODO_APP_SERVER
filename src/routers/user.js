const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/user");
const auth = require('../middleware/auth');


//--------------------sign up user --------------------//

router.post("/signup", signup);


//--------------------login user controller--------------------//
router.post("/login", login);


//--------------------logout user controller--------------------//
router.post("/logout",auth, logout);



module.exports = router;
