const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post") 
const chalk = require('chalk');

router.post("/", async (req, res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        console.log(chalk.green("New Post Saved with title", req.body.title));
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
})


router.put("/:id", async (req, res)=>{
    console.log(chalk.blue(`Update: `, req.params.id)); 
    try {
        const post = Post.findById(req.params.id);
            if(post.username === req.params.username){
                try {     
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                        $set:req.body,
                    }, {new: true});
                    console.log(chalk.blue("Post Updated with id: ", req.params.id));
                    res.status(200).send(updatedPost);
            }
         catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(401).json({"message": "Not Authorized to Update this post"});
    }

    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res)=>{
    console.log(chalk.red(`Delete: `, req.params.id)); 
    try {
        const post = await Post.findById(req.params.id);
            if(post.username === req.body.username){
                try {     
                    await post.delete();
                    console.log(chalk.red("Post Deleted with id: ",req.params.id));
                    res.status(200).send({"message":"Post Has Been Deleted"});
            }
         catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(401).json({"message": "Not Authorized to Delete this post"});
    }

    } catch (error) {
        res.status(500).json(error);
    }
     
});



router.get("/:id", async (req, res)=>{
    try {
        console.log(chalk.yellow(`Get: `, req.params.id));
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", async (req, res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username}) 
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error);
    }


})
module.exports = router;