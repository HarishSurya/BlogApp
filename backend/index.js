const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')
const logoRoute=require('./routes/logo')
const associationRoute=require('./routes/association')
const contactRoute=require('./routes/contact')



//database
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        // await mongoose.connect("mongodb+srv://suriya8486:blogfinal@cluster0.ldjbvkn.mongodb.net/")
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}



//middlewares
dotenv.config()
app.use(express.json())
//app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/images",express.static(path.join(__dirname,"/images")))
//app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}))
//app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}))
//  app.use(cors({
//    origin: '*'
//    }));
//app.use(cors());
app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  }));
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)
app.use("/api/logo", logoRoute)
app.use("/api/association", associationRoute)
app.use("/api/contact", contactRoute)


//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port "+process.env.PORT)
})