
import pencil from '../assets/pencil.svg'
import trash from '../assets/trash.svg'

function MainNoteCard(props) {
  return (
       <div  onClick={props.onClick}className='flex-1 min-w-[300px] border p-4 rounded-md shadow-md mx-[20px] bg-[#DECBA4] hover:scale-90 duration-1000'>
            <h1 className='text-xl font-bold'>Title: {props.title}</h1>
         <div className='flex justify-between mt-[10px]'>
            <div> <h1 className='text-md text-gray-700'>Subject: {props.subject}</h1></div>
             <div>
              <button onClick={props.editHandle}  className=' duration-1000 cursor-pointer  hover:scale-125'> <img className='h-[20px] w-[40px] ' src={pencil}/> </button> 
             <button onClick={props.deleteHandle} className=' duration-1000 cursor-pointer  hover:scale-125'> <img className='h-[20px] w-[40px]' src={trash}/> </button>
             </div>
         </div>
            <h1>Date: {props.date}</h1>
            <button onClick={props.cardModal} className='font-semibold font-[Poppins] border h-[40px] w-[120px] mt-[10px] rounded-2xl hover:scale-110 duration-1000 cursor-pointer'>Details</button>
         
          </div>
  )
}

export default MainNoteCard
