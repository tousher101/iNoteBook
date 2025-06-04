import React from 'react'

function EditTaskModal({cancelModal,titleValue, titleOnCh,descriptionValue,descriptiononCh, deadlineValue,deadlineonCh, submitEdit}) {
  return (
    <div className=' fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50' >
        <div className='grid justify-center content-center items-center bg-white p-[25px] rounded-2xl w-[500px] text-center text-black'>
            <p className='text-4xl'> Edit Your Task</p>
            <form onSubmit={submitEdit} className='mt-[30px] flex flex-col items-center'>
                <input value={titleValue} onChange={titleOnCh} className='border mt-[15px] px-[10px] py-[10px] w-[400px] rounded-2xl' type='text'/>
                 <input value={descriptionValue} onChange={descriptiononCh} className='border mt-[15px] px-[10px] py-[10px] w-[400px] rounded-2xl' type='text'/>
                  <input min={new Date().toISOString().split('T')[0]} value={ deadlineValue} onChange={deadlineonCh} className='border mt-[15px] px-[10px] py-[10px] w-[400px] rounded-2xl' type='date'/>
                  <button className=' border mt-[15px] h-[50px] w-[180px] rounded-2xl cursor-pointer hover:scale-110 duration-1000' type='submit'>Submit</button>
                   <button onClick={cancelModal}  className=' border mt-[15px] h-[50px] w-[180px] rounded-2xl cursor-pointer hover:scale-110 duration-1000' type='submit'>Cancel</button>

            </form>
        </div>
      
    </div>
  )
}

export default EditTaskModal
