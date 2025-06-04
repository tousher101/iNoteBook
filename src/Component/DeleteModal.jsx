import React from 'react'

function DeleteModal(props) {
  return (
    <div className={`fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50 transition-opacity duration-500 ${props.deltmdl} ${props.modalDesign?"opacity-100":'opacity-0'} `}>
        <div className={`grid justify-center content-center items-center bg-[rgb(29,24,24)] p-[25px] rounded-2xl w-[500px] text-center text-white duration-1000 ${props.modalDesign?'scale-100':'scale-0'}`}>
          <p className='text-4xl '>Warning!</p>
      <form className='mt-[30px] flex flex-col items-center'>
        <h1 className='text-xl'>Are You Sure Want To Delete Note?</h1>
        <button onClick={props.submitdelete}  className='border-1 mt-[15px] h-[50px] w-[180px] rounded-xl cursor-pointer hover:scale-110 duration-1000' type='submit'>Yes</button>
        <button onClick={props.cancelModl}   className='border-1 mt-[15px] h-[50px] w-[180px] rounded-xl cursor-pointer hover:scale-110 duration-1000'>No</button>
      </form>
    </div>
      </div>
  )
}

export default DeleteModal
