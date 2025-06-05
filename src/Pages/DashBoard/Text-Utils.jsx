import React, { useState } from 'react'
import { useTextCol } from '../Context/TextColContext'

function TextUtils() {
    const [text, setText]=useState('')
    const {bgTextCol}=useTextCol()
    const handleUpperCase=()=>{
        const newText = text.toLocaleUpperCase()
        setText(newText)
    }
    const handleLowerCase=()=>{
        const newText =text.toLocaleLowerCase()
        setText(newText)
    }
    const handleCapitalized=()=>{
        const newText = text.charAt(0).toUpperCase()+text.slice(1);
        setText(newText)
    }
    const handleTitleCase =()=>{
        const newText =text.toLowerCase().split(' ').map(word=> word.charAt(0).toUpperCase()+word.slice(1)).join(' ');
        setText(newText)
    }
    const handleRemoveText=()=>{
        const newText = text.split(/[ ]+/);
        setText(newText.join(' '))
    }
    const handleCopyText=()=>{
    navigator.clipboard.writeText(text)
    }
  return (
    <div className='max-w-[1380px]   mx-auto overflow-x-hidden'>
        
        <h1 className={`text-center mt-[10px] lg:text-4xl md:text-3xl text-2xl font-semibold ${bgTextCol}`}>Text-Util / Convert Your Text</h1>
        <div className={`border grid grid-cols-1 mx-[10px] mt-[30px] m  ${bgTextCol}`}> <textarea value={text} onChange={(e)=>{setText(e.target.value)}} className='p-[10px]'  placeholder='Write Your Text Here'/></div>

       <div className='lg:flex lg:justify-center md:grid md:grid-cols-2 grid grid-cols-1 justify-items-center mt-[30px] mx-[10px]'>
         <div className='grid'>
            <button onClick={handleUpperCase} className='border p-[10px] w-[220px] text-xl bg-[#C3CFE2] rounded-2xl cursor-pointer hover:scale-95 duration-1000 ml-[15px] mt-[10px]'>Convert UpperCase</button>
            <button onClick={handleLowerCase} className='border p-[10px] w-[220px] text-xl bg-[#C3CFE2] rounded-2xl cursor-pointer hover:scale-95 duration-1000 ml-[15px] mt-[10px]'>Convert LowerCase</button>
        </div>
        <div className='grid'> 
            <button onClick={handleCapitalized} className='border p-[10px] w-[220px] text-xl bg-[#C3CFE2] rounded-2xl cursor-pointer hover:scale-95 duration-1000 ml-[15px] mt-[10px]'>Convert Capitalized</button>
             <button onClick={handleTitleCase} className='border p-[10px] w-[220px] text-xl bg-[#C3CFE2] rounded-2xl cursor-pointer hover:scale-95 duration-1000 ml-[15px] mt-[10px]'>Convert Title Case</button>
        </div>
        <div className='grid'>
             <button onClick={handleRemoveText} className='border p-[10px] w-[220px] text-xl bg-[#C3CFE2] rounded-2xl cursor-pointer hover:scale-95 duration-1000 ml-[15px] mt-[10px]'>Remove Space</button>
             <button onClick={handleCopyText} className='border p-[10px] w-[220px] text-xl bg-[#C3CFE2] rounded-2xl cursor-pointer hover:scale-95 duration-1000 ml-[15px] mt-[10px]'>Copy Text</button>
             <div className='flex'>
                <button disabled={text.length===0} onClick={()=>{setText('')}} className='border p-[10px] w-[220px] text-xl bg-[#C3CFE2] rounded-2xl cursor-pointer hover:scale-95 duration-1000 ml-[15px] mt-[10px]'>Clear</button>
             </div>

        </div>
       </div>
       
    <div className='bg-[#111827] mt-[30px] text-white mx-[20px] rounded-2xl p-[15px]'>
        <h1 className='text-center text-3xl font-semibold'> Summary </h1>
        <p className='text-xl'>Total Words: {text.trim() === ""?0:text.trim().split(/\s+/).length }</p>
        <p className='text-xl'>Total Character: {text.length}</p>
        <div className='lg:w-[700px] md:w-[500px] w-[400px]'>
            <p className='text-xl break-words overflow-auto'>Preview: <span className='text-[15px]'>{text.length>0?text:'Nothing To Preview.'}</span> </p>
        </div>
    </div>
    </div>
  )
}

export default TextUtils
