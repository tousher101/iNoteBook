import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const API=import.meta.env.VITE_MAIN_URI_KEY
export const fetchNews = createAsyncThunk('news/fetchNews',async({category, page},thunkAPI)=>{
    try{
 const token = localStorage.getItem('auth-token')|| sessionStorage.getItem('auth-token')
const res= await fetch( `${API}/api/news/getnews?category=${category}&page=${page}`,{
  method: 'GET',
  headers:{
    'Content-Type':'application/json',
      'auth-token':token
  }
})
  const data= await res.json();

  return {articles:data.articles,
    totalResult: data.totalResults
  }

  }catch(error){console.error(error.message)}
})


const newsSclice = createSlice({
    name: 'news',
    initialState:{
        articles:[],
        loading: false,
        error: null,
        totalResults:0
    },
    extraReducers:(builder)=>{builder.addCase(fetchNews.pending, (state)=>{state.loading=true})
    .addCase(fetchNews.fulfilled,(state,action)=>{state.loading=false 
    state.articles=action.payload.articles  
    state.totalResults=action.payload.totalResult})
    .addCase(fetchNews.rejected,(state,action)=>{state.loading=false
        state.error=action.error.message
    })


},

})
export default newsSclice.reducer