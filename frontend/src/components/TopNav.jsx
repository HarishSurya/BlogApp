import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams} from "react-router-dom"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { UserContext } from '../context/UserContext'
import { useContext, useState } from 'react'
import axios from 'axios'
import {useEffect} from 'react'
import { IF, URL } from "../url"

const TopNav = () => {
    const navigate=useNavigate()
    const [file,setFile]=useState(null)
    const [editLogo, setEditLogo] = useState(false);
    const [logo, setLogo] =useState()

    const postId=useParams().id

    const {user}=useContext(UserContext)

    const handleCreate= async (e)=>{
        e.preventDefault()
        const post={
        //   title,
        //   desc,
          username:user.username,
          userId:user._id,
          //categories:cats
        }

        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename
          // console.log(data)
          //img upload
          try{
            const imgUpload=await axios.post(URL+"/api/upload",data)
            // console.log(imgUpload.data)
          }
          catch(err){
            console.log(err)
          }
        }
        //post upload
         //console.log(post)
        try{
            console.log("pos", post)
          const res=await axios.post(URL+"/api/logo/create",post,{withCredentials:true})
         // navigate("/posts/post/"+res.data._id)
           //console.log(res.data)
        //    window.location.reload()
        //    navigate("/contact")
        }
        catch(err){
          console.log(err)
        }
    }

    async function getCurrentLogo(){
        let response = await fetch(URL+"/api/logo");
        // console.log(response.body);
        const data = await response.json();  //await resolves the promise and returns data
        // console.log(data);
        setLogo(data)
      }
    useEffect(()=>{
        // const logos = axios.get(URL+"/api/logo")
        // setLogo(logos?.data)
    getCurrentLogo()
        

    },[editLogo])

    const handleUpdate=async (e)=>{
        e.preventDefault()
        const post={
        //   title,
        //   desc,
          username:user.username,
          userId:user._id,
        //   categories:cats,
        //   youtube:inputValue
        }
  
        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename
          // console.log(data)
          //img upload
          try{
            const imgUpload=await axios.post(URL+"/api/upload",data)
            // console.log(imgUpload.data)
          }
          catch(err){
            console.log(err)
          }
        }
        //post upload
       
        try{
          //const res=await axios.put(URL+"/api/logo/"+postId,post,{withCredentials:true})
          const res=await axios.post(URL+"/api/logo/create",post,{withCredentials:true})
          navigate("/")
          // console.log(res.data)
  
        }
        catch(err){
          console.log(err)
        }
      }

console.log("log", logo?.[0]?.photo)
  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
      {/* Social Media Icons */}
      <div className="flex items-center">
        <div className="ml-8 mr-5">
          <FaFacebook onClick={()=> navigate("https://www.facebook.com")}/>
        </div>
        <div className="mr-5">
          <FaTwitter />
        </div>
        <div>
          <FaInstagram />
        </div>
      </div>
      
      {/* Logo */}
      <div className="flex items-center justify-center">
        <img src={IF+logo?.[0]?.photo} alt="Logo" className="mr-5 w-48 h-14" />
        <p className="cursor-pointer" onClick={()=>setEditLogo(!editLogo)} ><BiEdit/></p>
         {/* <p className="cursor-pointer" onClick={{}}><MdDelete/></p> */}
        {editLogo && ( 
        <div >
            <form >
        <input onChange={(e)=>setFile(e.target.files[0])} type="file"  className='px-4'/>
        <button onClick={(e)=>{handleUpdate(e); setEditLogo(false); getCurrentLogo()}} className='bg-black text-white font-semibold px-2 py-2 md:text-xl text-lg rounded'>Upload</button>
        </form>
        </div>
        )}
        {/* <Link to="/" className="text-xl font-semibold ml-2">AEREDSL-UK</Link> */}
      </div>
      
      {/* Menu Options */}
      <div className="flex items-center">
        <Link to="/association" className="mr-6 cursor-pointer hover:text-yellow-500">Association Members</Link>
        <Link to="/contact" className="mr-6 cursor-pointer hover:text-yellow-500">Contact Us</Link>
        <Link to="/" className="mr-6 cursor-pointer hover:text-yellow-500">Recent Updates</Link>
      </div>
    </nav>
  )
}

export default TopNav 