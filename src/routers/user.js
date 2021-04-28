const express = require("express");
const router = express.Router();
const { signup, login, getUser, logout } = require("../controllers/user");
const auth = require('../middleware/auth');


//--------------------sign up user --------------------//

router.post("/signup", signup);


//--------------------login user controller--------------------//
router.post("/login", login);


//--------------------login user controller--------------------//
router.get("/user", auth,getUser);


//--------------------logout user controller--------------------//
router.post("/logout",auth, logout);



module.exports = router;
