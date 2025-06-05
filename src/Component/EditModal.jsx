import React from 'react'

function EditModal(props) {
  return (
   <div className={`fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50 transition-opacity duration-500 ${props.modalDesign ?"opacity-100":'opacity-0'} `}>
        <div className={`grid justify-center content-center items-center bg-[rgb(29,24,24)] p-[25px] rounded-2xl w-[500px] text-center text-white duration-1000 ${props.modalDesign?'scale-100':'scale-0'}`}>
          <p className='text-4xl '>Edit Your Note</p>
      <form onSubmit={props.formSub} className='mt-[30px] flex flex-col items-center'>
        <input className='border mt-[15px] px-[10px] py-[10px] lg:w-[400px] md:w-[350px] w-[350px] rounded-2xl' value={props.nameValue} onChange={props.nameOnCh} type='text'/>
        <input className='border mt-[15px] px-[10px] py-[10px] lg:w-[400px] md:w-[350px] w-[350px] rounded-2xl' value={props.subValue} onChange={props.subOnCh}  type='text'/>
          <textarea className='border-1 mt-[15px] px-[10px] py-[10px] lg:w-[400px] md:w-[350px] w-[350px] rounded-2xl' value={props.desValue} onChange={props.desOnCh}/>
        <button  className='border mt-[15px] h-[50px] w-[180px] rounded-xl cursor-pointer hover:scale-110 duration-1000' type='submit'>Submit</button>
        <button onClick={props.cancelModal}   className='border-1 mt-[15px] h-[50px] w-[180px] rounded-xl cursor-pointer hover:scale-110 duration-1000'>Cancel</button>
      </form>

    </div>
      </div>
  )
}

export default EditModal
