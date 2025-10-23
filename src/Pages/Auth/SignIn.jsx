import React, { useEffect, useState } from 'react'
import Cover3 from '../../assets/Cover3.png'
import eye from '../../assets/eye-slash.png'
import emaily from '../../assets/at.png'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../../Component/Alert'
import { useNotes } from '../Context/AllNotesContext'
import google from '../../assets/google.png'





function SignIn() {
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const neviget = useNavigate();
const [mesg, setMesg]=useState('');
const [type,setType] = useState('Success');
const BaseUrl = import.meta.env.VITE_MAIN_URI_KEY
const [showPass,setShowPass]=useState('password');
const [rememberMe, serRememberMe]=useState(false);
const {fetchData}=useNotes();


console.log(BaseUrl)
const toggledPassword= ()=>{
if(showPass==='password'){setShowPass('text')}else{setShowPass('password')};
}

const handleSubmit= async(e)=>{
 e.preventDefault();
 try{   const response= await fetch(`${BaseUrl}/api/auth/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            //cookies based Ei kahane ja likhte hove
            //withCredentials: true
        },
        body: JSON.stringify({email, password})
      })
      const result = await response.json()
    
      if (rememberMe){ localStorage.setItem('auth-token',result.Token); localStorage.setItem('email',email) }
      if (!rememberMe){sessionStorage.setItem('auth-token',result.Token)}

        /*Cookie based token saved
          useEffect(()=>{
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token)
      if(token){neviget('/home')}
        setEmail(remebarEmail);
      },[])
       */

     
  
    if(response.status===201){neviget('/home'); fetchData()}
    else if (response.status===400){setMesg(result.faild ||'Invalid Input'); setType('Error')}
    else if(response.status===404){setMesg(result.msg || 'User Not Found'); setType('Error')}
 
    }catch(error){console.error(error)}

    }

          useEffect(()=>{
      const remebarEmail=  localStorage.getItem('email');
      const token = localStorage.getItem('auth-token')
      if(token){neviget('/home')}
        setEmail(remebarEmail);
      },[])

    
 


  return (
    <>
     {mesg&&<Alert message={mesg} type={type} onClose={()=>{setMesg('')}}/>}
    <div className='h-screen bg-cover bg-center flex-col relative 'style={{backgroundImage:`url(${Cover3})`}}>
        <div className=' max-w-[1380px] mx-auto h-[70px] bg-transparent flex flex-[30%] justify-between items-center  '>
            <div className='mt-[30px]'><p className='lg:text-4xl md:text-3xl text-2xl ml-[10px] font-semibold text-[#c5aa6a] '>Hello,</p> 
            <p className='lg:text-5xl md:text-4xl text-3xl ml-[15px] font-[Poppins] text-gray-950 font-bold'>iNoteBook</p></div>
            
            <button className='lg:text-2xl md:text-xl text-[15px] border-2 lg:p-[12px] p-[8px] mr-[20px] rounded-2xl font-[Poppins] hover:scale-110 
            duration-1000 inset-shadow-lg mt-[30px] font-semibold'> <Link to='/signup'>Create Account</Link>  </button>
           </div>

       <div className=' h-[400px] lg:w-[400px] md:w-[350px] w-[340px] flex flex-[70%] shadow-xl rounded-2xl   absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  mt-[30px]'>

        <form onSubmit={handleSubmit} className=' backdrop-blur-lg  flex flex-col justify-around items-center content-center rounded-2xl w-[400px] relative'>
          <div> <h1 className='mb-[10px] text-3xl font-semibold font-[Poppins]'>Sign In</h1></div>
        <div className='flex flex-col'>
          
          <div className='flex'>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='E-mail' required className='border-1 p-[5px] mt-[10px] w-[300px] shadow-lg'/>
            <img className='h-[20px] w-[20px] absolute top-25 lg:right-15 right-8' src={emaily}/>
          </div>
          
          <div className='flex'>  
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  type={showPass}  placeholder='Password' required className='border p-[5px] mt-[10px] w-[300px] shadow-lg'/>  
          <input onChange={toggledPassword}  type='checkbox' id='toggle' className='h-[20px] w-[20px] absolute top-36 right-15  hidden'/> 
          <div className='absolute top-36 lg:right-15 right-8  h-[20px] w-[20px] '>
            <label htmlFor='toggle'>
              <img className='cursor-pointer' src={eye}/>
            </label>
          </div>
         </div>
        
          <button  type='submit' className='border-1 mt-[10px] rounded-2xl cursor-pointer hover:scale-110 duration-1000 shadow-lg py-[5px] font-semibold'>Sing In</button>
          <button className=' border mt-[20px] rounded-2xl cursor-pointer hover:scale-110 duration-1000 shadow-lg' ><a href={`${BaseUrl}/auth/google/callback`} className=' flex justify-center items-center'> <img className='h-[40px] w-[40px]' src={google}/> Sign In With Google</a></button>
        </div>
        <div className='flex'>
        <div className='flex mr-[30px] justify-center'><p>Remember Me</p> <input checked={rememberMe} onChange={(e)=>{serRememberMe(e.target.checked)}} className='ml-[5px] w-4' type='checkbox'/></div>
        <div><Link to='/forgetpassword'>Forget Password?</Link>  </div>
        </div>
          <div className='pb-[10px]'><p> Have No Account? <Link to='/signup'>Create Account</Link> </p></div>
        </form>
       </div>
    </div>
      
           </>




  )
}

export default SignIn
