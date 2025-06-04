import { createContext,useContext, useEffect, useState } from "react";


const NotesContext = createContext();
export const NotesProvider = ({children})=>{
    const Base =  import.meta.env.VITE_MAIN_URI_KEY;
    const [userInfo,setUserInfo]=useState({name:'',email:'', photo:'', photos:[]});
    const fetchData=async()=>{
        const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
        const resp= await fetch(`${Base}/api/auth/getuser`,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token': token
            }

        });
        const data= await resp.json();
         setUserInfo(data)
    };
        useEffect(()=>{
        fetchData()
    },[])


 
  return(<NotesContext.Provider value={{userInfo, setUserInfo, fetchData}}>{children}</NotesContext.Provider>)
};
export const useNotes=()=>useContext(NotesContext)