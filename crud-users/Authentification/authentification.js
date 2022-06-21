const express = require('express')

//mongoDB user model
const User = require('../model/User');

//mongoDB user verification model
const UserVerification = require('../model/UserVerification')


const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

//password handler
const bcrypt = require('bcrypt')
const { signupValidation, signinValidation } = require('../validation');


//SignUp
exports.signup = async (req, res) => {
    //VALIDATE DATA BEFORE CREATIONG USER 
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json({
        status: "FAILED",
        message: error.details[0].message
    });

    //checking if the user is already exist in the Database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist)
        return res.status(400).json({
            status: "FAILED",
            message: "Email  exists"
        })}

    //Hash passwords
    const saltRounds = 11
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds)



    //SignIn
    exports.signin = async (req, res) => {

        //VALIDATE DATA BEFORE CREATIONG USER 
        const { error } = signinValidation(req.body);
        if (error) return res.status(400).json({
            status: "FAILED",
            message: error.details[0].message
        });


        //PASSWORD IS CORRECT ?!
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(400).json({
            status: "FAILED",
            message: 'Invalid Password'
        })




        //create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

        //PUT TOKEN IN COOKIE
        res.cookie('token', token, { expire: new Date() + 1 })

        //SEND RESPONSE TO FRONTEND
        const { _id, name, email } = user
        return res.json({
            status: "SUCCESS",
            message: "Signin Successful",
            token,
            user: {
                _id,
                name,
                email
            }
        })

    }
//SIGN OUT
    exports.signout = (req, res) => {
        res.clearCookie('token')
        return res.json({
            status: "FAILED",
            message: "User Signout Successful"
        })
    }


//VERIFICATION JWT 
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}