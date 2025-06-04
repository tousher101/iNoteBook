import React from 'react'

function DeleteTaskModal({cancelModal, submitModal}) {
  return (
    <div className={`fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50`}>
        <div className={`grid justify-center content-center items-center bg-white p-[25px] rounded-2xl w-[500px] text-center text-black`}>
            <p className='text-4xl font-bold'>Warning!</p>
            <div className='mt[30px] flex flex-col items-center'>
                <h1 className='text-2xl mt-[10px]'>Are Your Sure! Want To Delete Task?</h1>
                <button onClick={submitModal} className='border mt-[15px] h-[50px] w-[180px] rounded-xl cursor-pointer hover:scale-110 duration-1000 text-xl'>Yes</button>
                <button onClick={cancelModal} className='border mt-[15px] h-[50px] w-[180px] rounded-xl cursor-pointer hover:scale-110 duration-1000 text-xl'>No</button>
            </div>
        </div>

    </div>
 
  )
}

export default DeleteTaskModal
