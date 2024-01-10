const express = require("express")
const router = express.Router()
const User = require("../models/User")
const validate = require("../utils/validate")
const utils = require("../utils")
const jwt = require("jsonwebtoken")
const auth = require("../auth")
const JWT_EXP = utils.DAY * 30

router.post("/login", async (req, res) => {
    try{
        let { email, password } = req.body
        if(!email || !password || typeof email != "string" || typeof password != "string"){
            return res.status(400).end()
        }
        email = email.toLowerCase()
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).end()
        }
        let valid = await auth.validatePasswordHash(user.password, password)
        if(!valid){
            return res.status(401).end()
        }
        let token = jwt.sign({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, exp: utils.now() + JWT_EXP }, process.env.JWT_KEY)
        res.setHeader("Authorization", token)
        res.end()
    }catch(error){
        console.error(error)
        return res.status(500).end()
    }
})

router.post("/register", async (req, res) => {
    try{
        const { firstName, lastName, password } = req.body
        let { email } = req.body
        if(![typeof firstName, typeof lastName, typeof email, typeof password].every(e => e == "string")){
            return res.status(400).end()
        }
        email = email.toLowerCase()
        const valid = [!!firstName, !!lastName, validate.email(email), validate.password(password)]
        if (!valid.every(v => v === true)) {
            return res.status(400).end()
        }
        let exists = await User.count({email}) > 0
        if(exists){
            return res.status(409).send("email taken")
        }
        let hash = await auth.newPasswordHash(password)
        let user = await User.create({firstName, lastName, email, password:hash})
        let token = jwt.sign({ id: user._id, firstName, lastName, email, exp: utils.now() + JWT_EXP }, process.env.JWT_KEY)
        res.setHeader("Authorization", token)
        res.setHeader('Access-Control-Expose-Headers', 'Authorization')
        res.end()
    }catch(error){
        console.error(error)
        res.status(500).end()
    }
})

router.post("/forgot-password-email", async (req, res) => { //generate reset password token
    try{
        let {email} = req.body
        if(!email || typeof email != "string"){
            return res.status(400).end()
        }
        email = email.toLowerCase()
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).end()
        }
        let token = jwt.sign({email, exp: utils.now() + utils.MINUTE * 15}, process.env.RESET_KEY)
        user.resetPasswordToken = token
        await user.save()
        const resetPasswordURL = `${process.env.RESET_PASSWORD_URL}/${token}`
        /*
            TODO: send email with token here
        */
       console.log(resetPasswordURL)
        return res.end()
    }catch(error){
        console.error(error)
        return res.status(500).end()
    }
})

router.post("/forgot-password-reset", async (req, res) => { // validate token and create new password
    try{
        let {token, password} = req.body
        let valid = jwt.verify(token, process.env.RESET_KEY)
        if(!valid){
            return res.status(400).end()
        }
        let user = await User.findOne({email: valid?.email, resetPasswordToken: token})
        if(!user){
            return res.status(404).end()
        }
        if(!validate.password(password)){
            return res.status(409).end()
        }
        user.resetPasswordToken = null
        user.password = await auth.newPasswordHash(password)
        await user.save()
        return res.status(200).end()
    }catch(error){
        console.error(error)
        return res.status(500).end()
    }
})

router.get("/logged", auth.isAuthorized, async (req, res) => { //if logged in returns 200, otherwise 401
    res.end()
})


module.exports = router
