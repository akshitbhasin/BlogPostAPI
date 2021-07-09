const router = require('express').Router();
const category = require('../models/category');

router.post("/", async(req, res)=>{
    const newCat = new category(req.body);
    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json({"message":error})
    }
})

router.get("/", async (req, res)=>{
    try {
        const cats = await category.find();
        res.status(200).json(cats);
    } catch (error) {
        res.status(500).json({"message":error})
    }
})

module.exports = router;