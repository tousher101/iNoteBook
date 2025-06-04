
import pencil from '../assets/pencil.svg'
import trash from '../assets/trash.svg'

function TaskCard({title,description,status,create,deadline,start,remaining,complete,openDeleteModal,openEditModal}) {
const createDate = new Date(create).toDateString();
const deadlineDate= new Date(deadline).toDateString();
const capitalStatus= status.charAt(0).toUpperCase()+status.slice(1);
const colorSelect=()=>{
  if(status==='pending'){ return'bg-yellow-500'}
  if(status==='ongoing'){return 'bg-blue-500'}
  if(status==='completed'){return 'bg-green-500'}
  if(status==='overdue'){return 'bg-red-500'}
}

  return (
    <>

    <div className={`shadow-md shadow-black w-[550px] ${colorSelect()} px-[20px]  py-[20px] rounded-2xl font-[Poppins]`}>
       <div className=' mb-[5px] w-[380px]'><h1 className='text-2xl break-words overflow-auto text-black font-semibold'>Title: {title}</h1></div> 
        <div className=' mb-[5px] w-[380px]'> <p className='text-xl break-words overflow-auto text-black'>Description: {description}</p></div>
       <div className='flex items-center justify-between'>
        <div> <p className=' mb-[5px] text-xl text-black'>Status: {capitalStatus}</p></div>
        <div className='mr-[50px]'> 
            <button onClick={openEditModal} className='opacity-50 hover:opacity-100 duration-500 h-[25px] w-[25px] mr-[15px] cursor-pointer hover:scale-110'> <img className='h-[25px] w-[25px]' src={pencil}/> </button>
            <button onClick={openDeleteModal} className='opacity-50 hover:opacity-100 duration-500 h-[25px] w-[25px] mr-[15px] cursor-pointer hover:scale-110'> <img className='h-[25px] w-[25px]' src={trash}/> </button>
        </div>
       </div>
       <p className=' mb-[5px] text-xl text-black'>Create Date: {createDate}</p>
        <p className=' mb-[5px] text-xl text-black'>Deadline: {deadlineDate}</p>
        <p className=' mb-[5px] text-xl text-black'>Remaining Days: {remaining} </p>
        <div className='mt-[15px]'>
        <button onClick={start} className=' text-xl h-[40px] w-[120px] rounded-2xl font-semibold shadow-lg bg-[#C3CFE2] cursor-pointer hover:scale-105 duration-500 text-black'>Start</button>
        <button onClick={complete} className=' text-xl h-[40px] w-[150px] ml-[15px] rounded-2xl font-semibold shadow-lg bg-[#C3CFE2] cursor-pointer hover:scale-105 duration-500 text-black '>Completed</button>
        </div>
      
    </div>
    </>
  )
}

export default TaskCard
