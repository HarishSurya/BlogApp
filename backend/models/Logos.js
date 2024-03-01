const mongoose=require('mongoose')

const LogoSchema=new mongoose.Schema({
    photo:{
        type:String,
        required:false,
        
    },
    username:{
        type:String,
        required:true,  
    },
    userId:{
        type:String,
        required:true,  
    },
},{timestamps:true})

module.exports=mongoose.model("Logo",LogoSchema)