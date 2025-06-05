import React, { useState, } from 'react'
import { useTextCol } from '../Context/TextColContext';
import { Link } from 'react-router-dom';
import useIdleTimer from '../../Component/IdealTimeOut';
import Alert from '../../Component/Alert';




function InoteBook() {
const [name,setName]=useState('');
const [subject,setSubject]=useState('')
const [description,setDescription]=useState('');
const {bgTextCol}=useTextCol();
useIdleTimer();
const [msg,setMsg]=useState('');
const [type,setType]=useState('');
  const Base =  import.meta.env.VITE_MAIN_URI_KEY

// const onChange=(e)=>{
//   setInputData({...inputData,[e.target.name]:e.target.value})
// }
// const [inputData, setInputData]=useState({name:"", subject:"", description:""});
 const submitHandle= async(event)=>{
  event.preventDefault();
  setName('')
  setSubject('')
  setDescription('')
const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
  const respons= await  fetch(`${Base}/api/notes/addnote`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'auth-token':token
    },
    body:JSON.stringify({name,subject,description})
    
  })
  const result = await respons.json();
  if(respons.status===400){setMsg(result.faild);setType('Error')}
  if(respons.status===201){setMsg(result.msg); setType('success')}
  }



  return (
    <>
  {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}

   <div className={`min-h-screen bg-cover bg-center flex-col relative `}>
    <form onSubmit={submitHandle}>
      <div className='lg:flex md:grid md:grid-cols-1 md:gap-3   grid grid-cols-1 gap-3 lg:justify-around   mt-[10px] bg-[#C3CFE2] py-3 lg:mx-[10px] rounded-2xl shadow-lg font-[Poppins] ' >
     <div>  <input className='border  px-[10px] py-[10px] lg:w-[400px] md:w-[300px] w-[300px] md:ml-[50px] lg:ml-[0px] ml-[50px] rounded-2xl'value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Title' type='text'/> </div> 
      <div> <input className='border px-[10px] py-[10px] lg:w-[400px] md:w-[300px] w-[300px] md:ml-[50px] lg:ml-[0px] ml-[50px] rounded-2xl' value={subject} onChange={(e)=>{setSubject(e.target.value)}} placeholder='Subject' type='text'/></div> 
      </div>
     
        <div className={` items-center grid grid-cols-1  mx-w-[1380px] mx-auto  mt-[40px] ${bgTextCol}`}>
    <div className='grid'><h1 className='text-center text-4xl font-semibold font-[Poppins] mb-[20px]'>Write Your Note Here</h1></div>  
    
       <div className=' border grid mx-[20px] '><textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Write Your Note' className='p-[10px]'/></div>
       <div className='flex justify-center items-center content-center mt-[30px] text-xl '>
        <button type='submit' className='hover:scale-105 font-[Poppins] border h-[60px] w-[250px] font-semibold rounded-2xl hover:bg-yellow-500 duration-1000 cursor-pointer shadow-lg ml-[10px]'>Add Note+</button>
        <button className='hover:scale-105 font-[Poppins] h-[60px] w-[250px] border font-semibold rounded-2xl hover:bg-cyan-600 cursor-pointer ml-[10px] duration-1000 shadow-lg'> <Link to='displaynote'>Note List</Link> </button>
       </div>

    </div>
   </form>

    </div>


    {  /* <div className={`fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50 ${modal} `}>
        <div className='grid justify-center content-center items-center bg-[rgb(29,24,24)] p-[25px] rounded-2xl w-[500px] text-center text-white'>
          <p className='text-4xl '>Add Your Note</p>
      <form className='mt-[30px] flex flex-col items-center' onSubmit={submitHandle}>

        <button  className='border-1 mt-[15px] h-[50px] w-[180px] rounded-xl cursor-pointer hover:scale-110 duration-1000' type='submit'>Submit</button>
        <button onClick={cancelHandle} className='border-1 mt-[15px] h-[50px] w-[180px] rounded-xl cursor-pointer hover:scale-110 duration-1000'>Cancel</button>
      </form>

    </div>
      </div>*/}
  

    </>

  )
}


export default InoteBook
