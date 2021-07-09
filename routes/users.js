const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post") 
const bcrypt = require('bcrypt');
const chalk = require('chalk');


router.put("/:id", async (req, res)=>{
    console.log(chalk.blue(`Update: `, req.params.id)); 
    if (req.body.userid === req.params.id) {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,  
            }, {new:true});
            console.log(chalk.blue("User Updated with userid: ", req.params.id));
            res.status(200).json({"message":"User Updated"}); 
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(401).json({"message":"No user to update with this id"});
    }
});

router.delete("/:id", async (req, res)=>{
    console.log(chalk.red(`Delete: `, req.params.id)); 
    if(req.body.userid === req.params.id){
        try {
            const user = await User.findById(req.params.id)  
          try {
            await Post.deleteMany({username: user.username})   
            await User.findByIdAndDelete(req.params.id)
                console.log(chalk.red("User Deleted with userid: ", req.params.id));
                res.status(200).json({"message": "user has been deleted"}); 
            } catch (error) {
                console.log(error);
                res.status(500).json({"message": `${error}`})
            }    
        } catch (error) {
            res.status(404).json({"message": "User Not Found"})
        }
        
    }else{
        res.status(402).json({"message": "No user with this id"})
    }    
    
     
});



router.get("/:id", async (req, res)=>{
    try {
        console.log(chalk.yellow(`Get: `, req.params.id));
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;