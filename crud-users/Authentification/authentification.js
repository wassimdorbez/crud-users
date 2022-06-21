//JWT
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//password handler
const bcrypt = require('bcrypt');
const { signupValidation, signinValidation } = require('../validation');

//SignUp
exports.signup = async (req, res) => {
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json({
        status: "FAILED",
        message: error.details[0].message
    });

    //CHECK USERS.CONTROLLERS FOR MORE DETAILS
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist)
        return res.status(400).json({
            status: "FAILED",
            message: "Email  exists"
        })};

    //Hash passwords
    const saltRounds = 11 
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    //SignIn
    exports.signin = async (req, res) => {

        //VALIDATE DATA BEFORE CREATIONG USER 
        const { error } = signinValidation(req.body);
        if (error) return res.status(400).json({
            status: "FAILED",
            message: error.details[0].message
        });

        //COMPARE THE PASSWORD RES WITH REQ.BODY
        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid) return res.status(400).json({
            status: "FAILED",
            message: 'Invalid Password'
        });

        //create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

        //PUT TOKEN IN COOKIE
        res.cookie('token', token, { expire: new Date() + 1 })

        //SEND RESPONSE TO FRONTEND
        const {   Email,
            FirstName,
            LastName,
            Age } = Users
        return res.json({
            status: "SUCCESS",
            message: "Signin Successful",
            token,
            Users: {
                Email,
                FirstName,
                LastName,
                Age
            }  })
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
    }}