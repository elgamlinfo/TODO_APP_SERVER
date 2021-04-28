require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");



//--------------------sign up user controller--------------------//
const signup = (req, res) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1) {
            res.status(422).json({error: "user exist!"});
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: err });
                } else {
                    const user = new User({
                        ...req.body,
                        password: hash,
                    });
                    user.save()
                    .then(result => {
                        res.status(201).json({message: "user created"})
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    });
                }
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
    
};




//--------------------login  user controller--------------------//
const login = (req, res) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result){
                    const token = jwt.sign({email: req.body.email},process.env.SECRET_KEY,{ expiresIn: '12h'});
                    user.tokens = user.tokens.concat({ token });
                    user.save();
                    res.status(202).json({
                        message: "you are logged in!",
                        user,
                        token
                    });
                }else{
                    res.status(500).json({error: "password not exist!"});
                }
            })
        }else{
            res.status(404).json({error: "user not found!"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
}


const getUser = (req, res) => {
    res.json(req.user);
}

//--------------------logout  user controller--------------------//
const logout = (req, res) => {
    req.user.tokens = req.user.tokens.filter(token => token.tokens != req.token);
    req.user.save()
    .then(resudd=> {
        res.status(200).json({ message: "Logged out!" });
    })
    .catch(err => {
        res.status(500).send(err);
    })
}


module.exports = {
    signup,
    login,
    getUser,
    logout
};
