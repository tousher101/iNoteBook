import React, { use, useEffect, useState } from 'react'
import { useTextCol } from '../Context/TextColContext';
import Alert from '../../Component/Alert';
import CardModal from '../../Component/CardModal';
import EditModal from '../../Component/EditModal';
import DeleteModal from '../../Component/DeleteModal';
import MainNoteCard from '../../Component/MainNoteCard';






function DisplayNote() {
  const [selectNote, setSelectNote]=useState(null);
  const [cardModal, SetCardModal]=useState(false);
const [animateModal,setAnimatedModal]=useState(false)
  const {bgTextCol}=useTextCol();
  const [editModal,setEditModan]=useState(false);
  const [deleteModal,setDeleteModal]=useState('hidden');
  const [selectEdit,setSelectEdit]=useState(null);
  const [msg,setmsg]=useState('');
  const [type,setType]=useState('');
  const [noteId,setNoteId]=useState(null);
  const [Notes,setNotes]=useState([]);
  const [messg,setMessg]=useState(null);
  const [ty,setTy]=useState(null);
  const [searchText,setSearchText]=useState('');
  const [searchNote,setSerchNote]=useState([]);
  const Base = import.meta.env.VITE_MAIN_URI_KEY;
  const [page,setPage]=useState(1)
  const [totalPag,setTotalpag]=useState(null)


const handleNext=(e)=>{
  e.preventDefault();
  if(page<totalPag){setPage(p=>p+1)}else{setmsg('No Page Available'); setType('Error')}
}
useEffect(()=>{
   displayData(page);
},[page])

  //Modal Handle:
    const deleteModalHandle =()=> {
if(deleteModal === 'hidden'){setDeleteModal('flex')}
setTimeout(()=>{
  setAnimatedModal(true)
},10)
}
const cancelDeleteModal=(e)=>{
 e.preventDefault();
      if(deleteModal=== 'flex'){setDeleteModal('hidden')}
          setAnimatedModal(false)
}

const editModalHandle =()=> {
    setEditModan(true)
    setTimeout(()=>{
  setAnimatedModal(true)
},10)

}
  const cancelEditModal=(e)=>{
      e.preventDefault();
    setEditModan(false)
     setAnimatedModal(false)

  }
  const CardModalHandle = ()=>{
    SetCardModal(true)
    setTimeout(()=>{
   setAnimatedModal(true)
    },10)
  }
  const cancelCardModal=(e)=>{
      e.preventDefault();
      SetCardModal(false)

     
         setAnimatedModal(false)
   
   
   
  }

// Main Notes API Call:
     const displayData=async()=>{
      const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
      try{
        const resp= await fetch(`${Base}/api/notes/fetchallnotes?page=${page}&limit=10`,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token': token
            }

        });
        const result= await resp.json();
        setNotes(result.notes);
        setTotalpag(result.totalPage);
      } catch(error){console.error(error)}
    };

  useEffect(()=>{
      displayData();
  },[]);

//Handle Search:
const searchClickHandle =(e)=>{
e.preventDefault();
searchData(searchText);
setSearchText('');
  }

  const searchData= async(Text)=>{
    const Token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
    try{
    const response= await fetch(`${Base}/api/notes/search?q=${Text}`,{
      method:'GET',
      headers:{
        'Content-Type':'Application/json',
        'auth-token': Token,
       
      },
    });
    const result = await response.json();
    setSerchNote(result)
 
    }catch(error){console.error(error)}
  }


//Handle Delete:
  const submitDelete = (e)=>{
    e.preventDefault();
    handleDelete(noteId);
    setDeleteModal('hidden')
     setAnimatedModal(false)
  }

  const handleDelete = async(id)=>{
    const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
    try{
    const response= await fetch(`${Base}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'Application/json',
        'auth-token': token
       
      },

    });
    const result = await response.json();
    if(response.status===200){setMessg(result.Success);setTy('success'); displayData();}
    if(response.status===404){setMessg(result.msg);setTy('Error')}

  }catch(error){console.error(error)}
  }

//Handle Edit:
  const editFormSubmit=(e)=>{
    e.preventDefault()
    editDataFetch(noteId);
    setEditModan(false);
     setAnimatedModal(false)
  }

    const editDataFetch= async(id)=>{
  const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
    try{
    const response= await fetch(`${Base}/api/notes/updatenote/${id}`,{
      method: 'PUT',
      headers:{
        'Content-Type':'application/json',
        'auth-token': token
       
      },
      body:JSON.stringify({name:selectEdit.name, subject:selectEdit.subject, description:selectEdit.description})
    })
    const result = await response.json();
    if(response.status===200){setmsg(result.msg); setType('success'); displayData()}
   else if(response.status===404){setmsg(result.msg); setType('Error')}
   else if(response.status===401){setmsg(result.msg); setType('Error')}
  }catch(error){console.error(error)}
  }

return(
  <>
  {messg&&<Alert message={messg} type={ty} onClose={()=>{setMessg('')}}/>}
  {msg&&<Alert message={msg} type={type} onClose={()=>{setmsg('')}}/>}
<div className='max-w-[1380px] mx-auto'>
  <div className='flex items-center content-center ml-[15px] mt-[15px]'>
    <div> <input value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} className={`border-1 w-[300px] px-[10px] py-[5px] rounded-2xl ${bgTextCol} placeholder:${bgTextCol}`} type='text' placeholder='Search'/></div>
    <div className='ml-[20px]'><button onClick={searchClickHandle}  className=' font-semibold mb-[5px] border mt-[10px] px-[30px] bg-white
     py-[6px] rounded-2xl hover:bg-blue-700 hover:text-white hover:border-black duration-500 cursor-pointer'>Search</button></div>
        </div>
        
    <h1 className={`text-4xl text-center font-semibold mt-[30px] ${bgTextCol}`}>All Notes</h1>

  <div className='flex flex-wrap gap-[15px] mt-10'>

   {searchNote.length > 0 ?
   searchNote.map((search) => (
     <MainNoteCard key={search._id} onClick={()=>{setSelectNote(search); setSelectEdit(search); setNoteId(search._id)}} title={search.name} subject={search.subject}
      editHandle={editModalHandle} deleteHandle={deleteModalHandle} date={new Date(search.date).toLocaleString()} cardModal={ CardModalHandle}/>
    )):  Notes.map((note) => (
     <MainNoteCard key={note._id} onClick={()=>{setSelectNote(note); setSelectEdit(note); setNoteId(note._id)}} title={note.name} subject={note.subject}
      editHandle={editModalHandle} deleteHandle={deleteModalHandle} date={new Date(note.date).toLocaleString()} cardModal={ CardModalHandle}/>
    ))
  
  }
  </div> 
  <div className='mt-[50px] flex justify-between '>
     <div className='ml-[20px] mb-[10px]'> <button onClick={()=>{setPage(p=>p-1,1)}} disabled={page<=1} className=' h-[45px] w-[180px] rounded-2xl text-xl bg-green-400
     cursor-pointer font-semibold shadow-lg'>Previous</button></div>
      <div className='mr-[20px] '><button onClick={handleNext} className=' h-[45px] w-[180px] rounded-2xl text-xl bg-green-400
      cursor-pointer font-semibold shadow-lg'>Next</button></div>
    </div>
  
</div>


{/* Modal Handle */}

  {cardModal&&selectNote&&( <CardModal name={selectNote.name} subject={selectNote.subject} des={selectNote.description} click={cancelCardModal} modalDesign = {animateModal}/>)}
  {editModal&&selectEdit&&( <EditModal formSub={editFormSubmit}
   nameValue={selectEdit.name } nameOnCh={(e)=>{setSelectEdit({...selectEdit,name:e.target.value})}}
   subValue = {selectEdit.subject } subOnCh = {(e)=>{setSelectEdit({...selectEdit,subject:e.target.value})}}
   desValue = {selectEdit.description} desOnCh={(e)=>{setSelectEdit({...setSelectEdit,description:e.target.value})}}
   cancelModal = {cancelEditModal} modalDesign = {animateModal}  />)}
    <DeleteModal deltmdl = {deleteModal} cancelModl = {cancelDeleteModal} submitdelete={submitDelete} modalDesign = {animateModal} />

    
   
    </>
  )
}

export default DisplayNote
