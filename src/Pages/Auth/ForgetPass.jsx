import React from 'react'
import { useState } from 'react'
import Alert from '../../Component/Alert';
import welcome from '../../assets/Welcome.png'


function ForgetPass() {
const [name,setName]=useState('');
const [email, setEmail]=useState('');
const [msg,setmsg]=useState('')
const [type,setType]=useState('')
const Base = import.meta.env.VITE_MAIN_URI_KEY
const handleSubmit= async(e)=>{
e.preventDefault();
try{
const response= await fetch(`${Base}/api/auth/forget-password`,{
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify({name, email})

  })
  const result = await response.json()

  if(response.status === 200){setmsg(result.Sucess||'Link Sent'); setType('success')}
  else if(response.status === 404){setmsg(result.msg|| 'User Not Found'); setType('Error')}
  else if (response.status=== 400){setmsg(result.faild || 'Something Went Wrong'); setType('Error')}

}catch(error){console.error(error)}
}


  return (
      <>
     { msg&&<Alert message={msg} type={type} onClose={()=>{setmsg('')}}/>}
    <div className='min-h-screen bg-center bg-cover justify-center flex border' style={{backgroundImage:`url(${welcome})`}}>
     
      <form onSubmit={handleSubmit} className='border grid grid-cols-1  h-[350px] w-[400px] mt-[150px] backdrop-blur-md rounded-2xl'>
        <h1 className='text-center text-4xl font-semibold mt-[20px]'>Forget Password</h1>
        <div className='grid justify-center mb-[30px]'>
        <div><input value={name} onChange={(e)=>{setName(e.target.value)}} className='border h-[60px] w-[350px] px-[15px] ' type='text' placeholder='Input Name'/></div>
        <div> <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='mt-[10px] border h-[60px] w-[350px] px-[15px]' type='email' placeholder='Input Email'/></div>
        <button className=' mt-[15px] border rounded-2xl text-xl font-semibold hover:scale-110 duration-1000 cursor-pointer' type='submit'>Submit</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default ForgetPass
