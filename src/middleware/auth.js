require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const auth = (req, res, next) => {
        const token = req.header('Authorization').split(" ")[1];
        const dcode = jwt.decode(token);
        if(Date.now() >= dcode.exp * 1000){
            res.status(401).json({error: 'unauthorized user!'});
            return;
        }
        jwt.verify(token,process.env.SECRET_KEY, (err, decoded)  => {
            if(err) {
                console.log(err);
            }else{
                User.findOne({email: decoded.email, 'tokens.token': token})
                .exec()
                .then(user => {
                    if(!user){
                        res.status(401).json({error: 'unauthorized user!'});
                    }
                    else{
                        req.user = user;
                        next();
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
            }
        });
}

module.exports = auth