import React, { useState } from 'react'
import Cover3 from '../../assets/Cover3.png'
import eye from '../../assets/eye-slash.png'
import emaily from '../../assets/at.png'
import userIcon from '../../assets/user-voice.png'
import { Link } from 'react-router-dom'
import Alert from '../../Component/Alert'


function SignUp() {
  const [name, setname]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPasword]=useState('');
 const [msg, setMsg]=useState('');
 const [type, setType]=useState('Error');
const Base = import.meta.env.VITE_MAIN_URI_KEY
const [confirmPass, setConfirmPass]=useState('');


  const handleSubmit= async(e)=>{
    e.preventDefault();
    const data={
      name,
      email,
      password
    }
    if(password !== confirmPass){return setMsg('Password Not Match')}
    const respons= await fetch(`${Base}/api/auth/createuser`,{
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await respons.json();
    if(respons.status === 400){setMsg(result.faild); setType('Error')}
    else if(respons.status===401){setMsg(result.mesg||'Email Already Used'); setType('Error')}
    else if (respons.status===201){setMsg(result.success); setType('success')}
  
    

  }
const [showPass,setShowPass]=useState('password')
const toggledPassword= ()=>{
  if(showPass==='password'){setShowPass('text')}else{setShowPass('password')}
}




  return (
    <>
   {msg&& <Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
    <div className='min-h-screen bg-cover bg-center flex-col relative 'style={{backgroundImage:`url(${Cover3})`}}>
        <div className=' max-w-[1380px] mx-auto h-[70px] bg-transparent flex flex-[30%] justify-between items-center  '>
            <div className='mt-[30px]'><p className='text-4xl ml-[10px] font-semibold text-[#c5aa6a] '>Hello,</p> 
            <p className='text-5xl ml-[15px] font-[Poppins] text-gray-950 font-bold'>iNoteBook</p></div>
            
            <button className='text-2xl border-2 p-[12px] mr-[20px] rounded-2xl font-[Poppins] hover:scale-110 
            duration-1000 inset-shadow-lg mt-[30px] font-semibold'><Link to='/signin'>Sign In</Link></button>
           </div>

       <div className=' w-[400px] flex flex-[70%] shadow-xl rounded-2xl  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  mt-[30px] h-[400px] ]'>

        <form onSubmit={handleSubmit} className='border backdrop-blur-lg  flex flex-col justify-around items-center content-center rounded-2xl w-[400px] h-[400px] relative'>
          <div> <h1 className='mb-[10px] text-3xl font-semibold font-[Poppins]'>Create Account</h1></div>
        <div className='flex flex-col'>
          <div className='flex'>
            <input value={name} onChange={(e)=>{setname(e.target.value)}}   type='text' placeholder='Full Name' required className='border p-[5px] mt-[10px] w-[300px] shadow-lg'/>
              <img className='h-[20px] w-[20px] absolute top-25 right-15 ' src={userIcon}/>
            </div>
          <div className='flex'>
            <input  value={email} onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='E-mail' required className='border p-[5px] mt-[10px] w-[300px] shadow-lg'/>
            <img className='h-[20px] w-[20px] absolute top-37 right-15' src={emaily}/>
          </div>
          
          <div className='flex'>  
            <input value={password} onChange={(e)=>{setPasword(e.target.value)}}  type={showPass}  placeholder='Password' required className='border p-[5px] mt-[10px] w-[300px] shadow-lg'/>  
          <input onChange={toggledPassword} type='checkbox' id='toggle' className='h-[20px] w-[20px] absolute top-48 right-15 cursor-pointer hidden peer'/> 
          <div className='absolute top-48 right-15 cursor-pointer h-[20px] w-[20px] '>
            <label htmlFor='toggle'>
              <img src={eye}/>
            </label>
          </div>
         </div>

            <div className='flex'>  
            <input value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}}  type={showPass}  placeholder='Confirm Password' className='border p-[5px] mt-[10px] w-[300px] shadow-lg'/>  
          <input onChange={toggledPassword} type='checkbox' className='h-[20px] w-[20px] absolute top-60 right-15 cursor-pointer hidden  peer'/> 
         </div>
        
          <button  type='submit' className='border mt-[10px] rounded-2xl cursor-pointer hover:scale-110 duration-1000 shadow-lg py-[5px] font-semibold'>Sign Up</button>
        </div>
          <div className='mb-[25px]'><p>Already Have Account? <Link to='/signin'>Sign In</Link> </p></div>
        </form>
       </div>
    </div>
           </>
  )
}

export default SignUp
