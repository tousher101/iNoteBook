import React, { useState } from 'react'
import darkmode from '../assets/darkmode.png'
import User from '../assets/User.svg.png'
import light from '../assets/lightmode.png'
import { Link } from 'react-router-dom'
import { useTextCol } from '../Pages/Context/TextColContext'
import { useNavigate } from 'react-router-dom'
import { useNotes } from '../Pages/Context/AllNotesContext'
import CropperModal from '../PhotoCroper/CropperModal'
import Alert from './Alert'

function Navbar() {

  
  const [darkmo,setDarMo]=useState(localStorage.getItem('darkmo')|| darkmode);
  const [navCol,setNavCol]=useState( localStorage.getItem('navCol')||'bg-[#c5aa6a]');
  const [textCol, setTextCol]=useState(localStorage.getItem('textCol')||'text-black');
  const {setBgTextCol}=useTextCol();
  const navigate = useNavigate();
  const {userInfo, fetchData} = useNotes();
  const [cropperModal,setCropperModal]=useState(false);
  const [massg, setMessg]=useState('');

  const [type, setType]=useState('')

  const handleUpload = async(blob)=>{
    const formData = new FormData();
    formData.append('photo',blob);
    const token = localStorage.getItem('auth-token')||sessionStorage.getItem('auth-token')
    try{
      const res= await fetch('http://localhost:5000/api/photos/uploadphoto',{
        method:'POST',
        headers:{
          'auth-token':token,
        },
        body: formData
      });
      const data= await res.json();
      if(res.status===200){setMessg(data.msg);setType('sucess');fetchData() }
      else if (res.status===404){setMessg(data.msg);setType('Error')}
      }catch(error){console.error(error.message)}

    }
  
  
  const handleCropper=()=>{
    setCropperModal(true)
  }
  const cancleCropper=()=>{
    setCropperModal(false)
  }
  

  const handleSignOut=()=>{
    localStorage.removeItem('auth-token');
    sessionStorage.removeItem('auth-token');
    navigate('/signin')
  }
  
  const darkHandle=()=>{
    if (darkmo=== darkmode){setDarMo(light);
     document.body.style.backgroundColor=('Black');
     setNavCol('bg-gray-950');setTextCol('text-white'); setBgTextCol('text-white')}
    else{setDarMo(darkmode);
    document.body.style.backgroundColor=('White');
    setNavCol('bg-[#c5aa6a]');setTextCol('text-black'); setBgTextCol('text-black')
 }
  }
  
  const time=Date().toLocaleString();
  
  return (
    <>
   {massg&&<Alert message={massg} type={type} onClose={()=>{setMessg('')}}/>}
  <nav className={`max-w-[1380px] mx-auto h-[70px] ${navCol}  flex  content-center items-center`} > 
    <div className='font-Roboto flex flex-[25%]  ml-[10px] items-center content-center'> 
    <h1 className='text-6xl font-extrabold mask-l-from-neutral-950 font-[Poppins] text-amber-900'>i</h1> 
    <span className={`text-5xl font-[Poppins] font-bold ${textCol} text-shadow-lg`}>NoteBook</span> </div>
    <div className='flex-[65%]   content-center items-center'>
        <ul className={`flex justify-around text-2xl font-[Poppins] ${textCol}`}>
            <li className='hover:scale-110 duration-500 hover:underline'> <Link to=''>iNoteBook</Link></li>
             <li className='hover:scale-110 duration-500 hover:underline'><Link to='news'>News Feeds</Link></li>
              <li className='hover:scale-110 duration-500 hover:underline'><Link  to='textutils'>Text-Utils</Link></li>
              <li className='hover:scale-110 duration-500 hover:underline'><Link to='taskmanager'>Task-Manager</Link></li>
        </ul>
    </div>
    <div className='flex-[5%]  flex items-center justify-center '><button onClick={darkHandle} className='h-[60px] w-[60px] cursor-pointer'><img className='h-[40px] w-[40px]' src={darkmo}/> </button></div>
    <input type='checkbox' id='togg'  className=' hidden  peer  h-[60px] w-[60px]'/>
   <div className='h-[60px] w-[60px] flex-[5%] flex justify-center'>
    <label htmlFor='togg'>
      <div>
     {userInfo?.photo?.url? ( <img className='h-[60px] w-[60px] rounded-3xl cursor-pointer' src={userInfo.photo.url}/>):''  }
      </div>
        
    </label>
   </div>
       <div className='bg-[#c5aa6a] fixed top-[70px] right-0 h-[320px] w-[220px] text-balck transition-transform duration-1000 - translate-x-full
   peer-checked:translate-x-0 rounded-l-2xl content-center z-10'>
        <h1 className='text-lg text-center font-[Poppins] font-semibold'>{userInfo.name} </h1>
   <p className='text-center font-semibold'>{userInfo.email}</p>
  
    <div className='px-[20px]  text-center'>
    <p>{time}</p>
    </div>
       <button onClick={handleCropper} className='border shadow-lg mt-[15px] ml-[55px] h-[60px] w-[120px] rounded-2xl px-[10px] cursor-pointer
     hover:bg-red-600 duration-500  border-black hover:text-white text-[15px]'>Change Profile Photo</button>
    <button onClick={handleSignOut} className='border-1 shadow-lg mt-[15px] ml-[65px] h-[40px] w-[100px] rounded-2xl px-[10px] cursor-pointer
     hover:bg-red-600 duration-500  border-black hover:text-white'>Sign Out</button>
   </div>
 
  </nav>


{cropperModal&&<CropperModal cancel={cancleCropper} onUpload={handleUpload}/>}
   
  </>
  )
}

export default Navbar
