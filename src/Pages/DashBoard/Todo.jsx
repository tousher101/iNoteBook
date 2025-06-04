import React, { useState } from 'react'
import Slider from '../../Component/Silder'
import { useNotes } from '../Context/AllNotesContext'





function Todo() {
  const [selectedFile,setSelectedFile]=useState([]);
  const formData = new FormData();
  selectedFile.forEach((file)=>{formData.append('photos',file)});
   const {userInfo, fetchData}=useNotes();

   const refreshData=()=>{
    userInfo();
   }
  
  const handleChange = (e)=>{
const files = Array.from(e.target.files)
setSelectedFile(files)
  }


const fetchPhotos= async()=>{
  const token = localStorage.getItem('auth-token')||sessionStorage.getItem('auth-token');
  try{
  const res= await fetch('http://localhost:5000/api/photos/uploadphotos',{
    method:'POST',
    headers:{
      'auth-token':token
    },
    body: formData
  })
  const result = await res.json();
  if (res.status===200){ console.log(result.msg); fetchData()}
 }catch(error){console.error(error)}

};

const deletePhotos = async()=>{
  const token = localStorage.getItem('auth-token')||sessionStorage.getItem('auth-token');
  try{
const respo= await fetch('http://localhost:5000/api/photos/deleteallphoto',{
  method:'DELETE',
  headers:{
    'auth-token':token
  },
  
});
const result = respo.json();
if(respo.status===200){console.log(result.msg);fetchData()}
}catch(error){console.error(error)}
}



  return (
    <div>
   <Slider/>
      <button onClick={deletePhotos}>Delete</button>
     <input type='file' name='photos' multiple accept='image' onChange={handleChange}/>
     <button onClick={fetchPhotos}>Upload</button>
    </div>
    
  )
}

export default Todo
