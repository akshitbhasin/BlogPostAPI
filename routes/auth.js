const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const chalk = require('chalk');

// Register
router.post("/register", async (req, res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        })
        const user = await newUser.save();
        console.log(chalk.green("New User Created with username: ", user.username));
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({"message": `${error}`});
    }
})

// Login
router.post("/login", async (req, res)=>{
        try {
            const user = await User.findOne({username: req.body.username})
            !user && res.status(400).json({"message":"User Not Found"})
            const validated = await bcrypt.compare(req.body.password, user.password)
            !validated && res.status(400).json({"message":"Wrong Credentials"});
            
            const {password, ...others} = user._doc;
            console.log(chalk.blue("User Login with username: ", others.username));
            res.status(200).json(others);


        } catch (error) {
            console.log(error)
            res.status(500).json({"message": `${error}`})
        }
})
module.exports = router;