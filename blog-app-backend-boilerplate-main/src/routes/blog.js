const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here


router.get('/blog',async (req,res)=>{
    console.log(req.query);
    const {page=1, search=new RegExp("[a-z]","i")}= req.query;
    try {
        const result=await Blog.find({topic:new RegExp(search)}).skip((page-1)*5).limit(5);
        res.json({
            status:"success",
            result
        })
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message
        })
    }
})
router.post('/blog', async (req, res)=>{
    try {
        const result= await Blog.create({
            topic: req.body.topic,
            description: req.body.description,
            posted_at: req.body.posted_at,
            posted_by:req.body.posted_by

        })
        console.log(result)
        res.json({
            status:"success",
            result
        })
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message
        })
    }
})


router.put('/blog/:id', async (req, res)=>{
    try {
        const result= await Blog.updateOne({_id:req.params.id},{
            topic: req.body.topic,
            description: req.body.description,
            posted_at: req.body.posted_at,
            posted_by:req.body.posted_by

        })
        console.log(result)
        res.json({
            status:"success",
            result
        })
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message
        })
    }
})


router.put('/blog/:id', async (req, res)=>{
    try {
        const result= await Blog.deleteOne({_id:req.params.id})
        console.log(result)
        res.json({
            status:"success",
            result
        })
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message
        })
    }
})

module.exports = router;