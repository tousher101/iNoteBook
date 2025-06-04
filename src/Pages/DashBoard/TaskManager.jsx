
import React, { use, useEffect, useState } from 'react'
import TaskCard from '../../Component/TaskCard' 
import Alert from '../../Component/Alert'
import DeleteTaskModal from '../../Component/DeleteTaskModal';
import EditTaskModal from '../../Component/EditTaskModal';

function TaskManager() {
  const base= import.meta.env.VITE_MAIN_URI_KEY
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [deadline,setDeadline]=useState('');
  const [msg,setMsg]=useState('');
  const [type,setType]=useState('');
  const [tasks,setTasks]=useState();
  const [completeAlert,setCompleteAlert]=useState('');
  const [completeType, setCompleteType]=useState('');
  const [deleteModalOpen, setDeleteModalOpen]=useState(false);
  const [taskId,setTaskId]=useState(null);
  const [editModalOpen,setEditModalOpen]=useState(false);
  const [selectedTask, setSelectedTask]=useState(null);
  const [page, setPage]=useState(1);
  const [totalPag,setTotalpag]=useState(null);
  

  //Handle/Submit Delete Modal
  const openDeleteTaskModal=()=>{
    setDeleteModalOpen(true)
  }
  const closeDeleteTaskModal=()=>{
    setDeleteModalOpen(false)
  }
  const submitDeleteAPI=()=>{
    handleDelete(taskId);
    setDeleteModalOpen(false);
  }

  //Handle/Submit Edit Modal
  const openEditTaskModal=()=>{
    setEditModalOpen(true)
  }
  const closeEditTaskModal=(e)=>{
    e.preventDefault();
    setEditModalOpen(false)
  }
  const submitEditAPI=(e)=>{
    e.preventDefault();
    handleEdit(taskId);
    setEditModalOpen(false)
  }

  const handleNextButton=()=>{
if(page<totalPag){setPage((p)=>p+1)}else{setCompleteAlert('No Page Available'); setCompleteType('Error')}

  }

const handleEdit=async(_id)=>{

  try{
      const token = localStorage.getItem('auth-token')|| sessionStorage.getItem('auth-token');
    const res= await fetch(`${base}/api/tasks/updatetask/${_id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'auth-token':token
      },
      body: JSON.stringify({title:selectedTask.title, description:selectedTask.description, deadline})
    });
    const result= await res.json();
    if(res.ok){setCompleteAlert(result.msg);setCompleteType('success'); fecthAllTask()}
    else if(res.status===404){setCompleteAlert(result.msg); setCompleteType('Error')}
    else if(res.status===400){setCompleteAlert(result.msg); setCompleteType('Error')}
     else if(res.status===401){setCompleteAlert(result.msg); setCompleteType('Error')}
    else if(res.status===500){setCompleteAlert(result.msg); setCompleteType('Error')}
    }catch(error){console.error(error)}
  
}



  const handleDelete= async(_id)=>{
     
    try{
      const token = localStorage.getItem('auth-token')|| sessionStorage.getItem('auth-token');
    const res= await fetch(`${base}/api/tasks/deletetask/${_id}`,{
      method:'DELETE',
      headers:{
        'auth-token':token
      }
    });
    const result= await res.json();
    if(res.ok){setCompleteAlert(result.msg);setCompleteType('success'); fecthAllTask()}
    else if(res.status===404){setCompleteAlert(result.msg); setCompleteType('Error')}
    else if(res.status===400){setCompleteAlert(result.msg); setCompleteType('Error')}
     else if(res.status===401){setCompleteAlert(result.msg); setCompleteType('Error')}
    else if(res.status===500){setCompleteAlert(result.msg); setCompleteType('Error')}
    }catch(error){console.error(error)}
  }



  const handleComplete=async(_id)=>{
    try{
    const token = localStorage.getItem('auth-token')|| sessionStorage.getItem('auth-token');
    const res= await fetch(`${base}/api/tasks/completetask/${_id}`,{
      method:'PUT',
      headers:{
        'auth-token':token
      }
    });
    const result= await res.json()
    if(res.ok){setCompleteAlert(result.msg); setCompleteType('success'); fecthAllTask()}
    else if(res.status===400){setCompleteAlert(result.msg); setCompleteType('Error')}
    else if(res.status===401){setCompleteAlert(result.msg); setCompleteType('Error')}
    }catch(error){console.error(error)}
  }


  const handleStart= async(_id)=>{
    try{
  const token = localStorage.getItem('auth-token')|| sessionStorage.getItem('auth-token');
    const res = await fetch(`${base}/api/tasks/starttask/${_id}`,{
      method: 'PUT',
      headers:{
        'auth-token': token
      }
    }) ;
    const result = await res.json();
    
    if(res.status===200){setMsg(result.msg);setType('success');fecthAllTask()}
    else if(res.status===202){alert(result.msg)}
    else if(res.status===400){setMsg(result.msg);setType('Error')}
    }catch(error){console.error(error)}
  }

  const fecthAllTask= async()=>{
    try{
     const token = localStorage.getItem('auth-token')|| sessionStorage.getItem('auth-token');
    const res= await fetch(`${base}/api/tasks/fetchtasks`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token': token
      }
    });
    const result = await res.json();
    if(res.ok){setTasks(result.tasks);setTotalpag(result.totalPage)}
    else if(res.status===202){alert(result.msg)}
    }catch(error){console.error(error)}
  }

  useEffect(()=>{
    fecthAllTask()

  },[])

  const handleSubmitTask= async(e)=>{
    e.preventDefault();
    setDeadline('');
      setDescription('');
      setTitle('');
      try{
      const token = localStorage.getItem('auth-token')|| sessionStorage.getItem('auth-token')
    const res = await fetch(`${base}/api/tasks/addtasks`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':token
      },
      body:JSON.stringify({title,description,deadline})
    });
      const result = await res.json();
      if(res.status===200){setMsg(result.msg);setType('success');fecthAllTask()}
       else if(res.status===400){setMsg(result.faild); setType('Error')}
       else if(res.status===500){setMsg(result.msg); setType('Error')}
    }catch(error){console.error(error)}
  }


  return (
    <>
   {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
     {completeAlert&&<Alert message={completeAlert} type={completeType} onClose={()=>{setCompleteAlert('')}}/>}
    <div className='max-w-[1380px] mx-auto grid grid-cols-1'>
      
     <div className='flex flex-col justify-center bg-[#1E293B] text-white pb-[20px] rounded-b-3xl shadow-lg'>
      <div>
      <h1 className='text-center text-4xl font-semibold font-[Poppins] mt-[30px]'>Add Your Task</h1>
      </div>
      <form onSubmit={handleSubmitTask}>
      <div className='flex justify-around mt-[20px] text-xl items-center'>
        <p>Title: <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className='ml-[10px] w-[200px] px-[10px]' type='text' placeholder='Add Titile'/></p>
      <p>Description: <input value={description} onChange={(e)=>{setDescription(e.target.value)}} className='ml-[10px] w-[200px] px-[10px]' type='text' placeholder='Add Description'/></p>
      <p>Deadline:<input min={new Date().toISOString().split('T')[0]} value={deadline} onChange={(e)=>{setDeadline(e.target.value)}} className='ml-[10px]' type='date'/></p>
      <button type='submit' className='border py-[10px] w-[150px] rounded-2xl bg-[#E9E4F0] text-black font-semibold cursor-pointer
      hover:scale-90 duration-1000'>Add Task+</button>
      </div>
      </form>
     </div>

     <div className='bg-[#1E293B] text-white font-[Poppins] mt-[50px] rounded-3xl h-full  '>
      <div className='mt-[30px]'><h1 className='text-center text-4xl font-semibold'>Dash Board</h1></div>
      <div className='grid grid-cols-2 gap-[30px] mt-[30px] ml-[70px]'>
        {tasks?.map((task)=> (
          <div key={task._id} onClick={()=>{setTaskId(task._id); setSelectedTask(task) }} >
             <TaskCard  title={task.title} description={task.description} status={task.updatedStage} 
             create={task.createAt} deadline={task.deadline} remaining={task.remainingTime} start={()=>{handleStart(task._id)}} complete={()=>{handleComplete(task._id)}}
              openDeleteModal={openDeleteTaskModal} openEditModal={openEditTaskModal}
              />
          </div>
         
      ))
      }
      </div>
     </div>
     <div className='flex justify-between mt-[60px] mb-[15px]'>
      <button onClick={()=>{setPage((p)=>p-1, 1)}} disabled={page<=1} className=' h-[50px] w-[180px] text-xl rounded-2xl bg-[rgb(133,126,126)] text-black ml-[15px]'>Previous</button>
      <button onClick={handleNextButton} className=' h-[50px] w-[180px] text-xl rounded-2xl bg-[rgb(133,126,126)] text-black mr-[15px] '>Next</button>
     </div>
    </div>


         {deleteModalOpen&& <DeleteTaskModal cancelModal={closeDeleteTaskModal} submitModal={submitDeleteAPI}/>}

         {selectedTask&&editModalOpen&& <EditTaskModal  cancelModal={closeEditTaskModal} titleValue={selectedTask.title} titleOnCh={(e)=>{setSelectedTask({...selectedTask,title:e.target.value})}}
          descriptionValue={selectedTask.description} descriptiononCh={(e)=>{setSelectedTask({...selectedTask, description:e.target.value})}}
          deadlineValue={deadline} deadlineonCh={(e)=>{setDeadline(e.target.value)}} submitEdit={submitEditAPI}/>}

   </>
  )
}

export default TaskManager

