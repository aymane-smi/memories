
const user   = require("../models/user"),
      jwt    = require("jsonwebtoken"),
      bcrypt = require("bcryptjs");

exports.signin = async (req, res)=>{
    const {email, password} = req.body;

    try{
        let User = await user.findOne({email});
        if(!User) res.status(404).json({
            message: "email not found!"
        });
        let passwordValid = bcrypt.compare(password, User.password);
        if(!passwordValid) res.status(401).json({
            message: "wrong password"
        });
        console.log(process.env.SECRET_KEY);
        let token = jwt.sign({
            email: User.email,
            id: User._id
        }, process.env.SECRET_KEY, {expiresIn: "1h"});
        res.status(200).json({
            message: "logged in successfully",
            result:User,
            token
        });
    }catch(err){
        res.status(500).json({
            err: err.message,
            message: "something went wrong"
        });
    }
};



exports.signup = async (req, res)=>{
    const {email, password, lastName, firstName} = req.body;
    console.log(req.body);
    try{
        let newEmail = await user.findOne({email});
        console.log(newEmail);
        if(newEmail)
            res.status(401).json({
                message: "email already exist!"
            });
        let hashPassword = await bcrypt.hash(password, 12);
        let newUser = user.create({email, password: hashPassword, name: `${lastName} ${firstName}`});
        let token = jwt.sign({
            email: User.email,
            id: User._id
        }, process.env.SECRET_KEY, {expiresIn: "1h"});
        res.status(200).json({
            message: "user created successfully",
            result: User,
            token
        });
    }catch(err){
        res.status(500).json({
            err: err.message,
            message: "something went wrong"
        });
    }
};