import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const base=import.meta.env.VITE_NEWS_API
export const fetchNews = createAsyncThunk('news/fetchNews',async({category, page},thunkAPI)=>{
    try{
  
const res= await fetch( `${base}/v2/top-headlines?country=us&category=${category}&apiKey=94d3e23148cb4143bb6fdb1fddbce25a&page=${page}&pageSize=19`)
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