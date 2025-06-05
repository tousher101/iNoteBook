import React from 'react'
import Cover2 from '../assets/Cover2.png'
import { Link } from 'react-router-dom'

function StartUp() {
  return (
    <>
     <div className='h-screen w-full bg-cover bg-center' style={{backgroundImage:`url(${Cover2})`}} >
          <div className='max-w-[1380px] mx-auto h-[70px] bg-transparent  flex justify-between items-center '>
            <div className='mt-[30px]'><p className='lg:text-4xl md:text-3xl text-2xl ml-[10px] font-semibold text-[#c5aa6a] '>Hello,</p> 
            <p className='lg:text-5xl md:text-4xl text-3xl ml-[15px] font-[Poppins] text-gray-950 font-bold'>iNoteBook</p></div>
            
            <button className='lg:text-2xl md:text-xl text-xl border-2 lg:p-[12px] md:p-[10px] p-[8px] mr-[10px] rounded-2xl font-[Poppins] hover:scale-110 
            duration-1000 inset-shadow-lg mt-[30px] font-semibold'> <Link to='/signup'>Get Started</Link> </button>
           </div>
    </div>
   
    
   
   
     </>
  )
}

export default StartUp
