const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
// const Post=require('../models/Post')
const Comment=require('../models/Association')
const verifyToken = require('../verifyToken')
const Contact = require('../models/Contact')

//CREATE
router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newAssociation=new Contact(req.body)
        // console.log(req.body)
        const savedPost=await newAssociation.save()
        
        res.status(200).json(savedPost)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
})

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
       
        const updatedAssociation=await Contact.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedAssociation)

    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Contact.findByIdAndDelete(req.params.id)
        //await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Association has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET POST DETAILS
router.get("/:id",async (req,res)=>{
    try{
        const post=await Contact.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET POSTS
router.get("/",async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts=await Contact.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET USER POSTS
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Contact.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports=router