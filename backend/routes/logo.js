const express=require('express')
const router=express.Router()
// const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Logos=require('../models/Logos')
const verifyToken = require('../verifyToken')

//CREATE
router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newLogo=new Logos(req.body)
        const savedLogo=await newLogo.save()
        res.status(200).json(savedLogo)
    }
    catch(err){
        res.status(500).json(err)
    }
     
})

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
       
        const updatedLogo=await Logos.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedLogo)

    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Logos.findByIdAndDelete(req.params.id)
        
        res.status(200).json("Logo has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})




// //GET LOGO
// router.get("/post/:postId",async (req,res)=>{
//     try{
//         const logos=await Logos.find({postId:req.params.postId})
//         res.status(200).json(logos)
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })

//GET LOGO
router.get("/",async (req,res)=>{
    try{
        // const logos=await Logos.findOne({}).sort({ _id: -1 })
        const logos=await Logos.find().limit(1).sort({$natural:-1}) 
        console.log("log", logos)
        res.status(200).json(logos)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports=router