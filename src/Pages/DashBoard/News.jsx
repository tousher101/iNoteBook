import React, { useState } from 'react'
import NewsCard from '../../Component/NewsCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../redux/slices/newsSlice';
import { useParams } from 'react-router-dom';


function News() {
const dispatch = useDispatch();
const {category}=useParams();
const [page,setPage]=useState(1)


const {totalResults, articles, loading, error}=useSelector((state)=>state.news)

useEffect(()=>{
  const selectedCat= category || 'general'
  dispatch(fetchNews({category:selectedCat,page}))
},[category,page])

  const handleNext=()=>{
            const totalPage = Math.ceil(totalResults/20);
            if(page < totalPage){setPage(prev=>prev+1)}else{alert('No page Available')}    
            }
if(loading) return  <p className='text-center text-2xl font-bold mt-[20px]'>Loding-------------</p>
if (error) return <p>ERORR:{error}</p>
 
  return ( 
<div className='max-w-[1380px] mx-auto mt-[15px]'>
  <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
    {articles?.map((ari,i)=>{
      return <div key={i}>
        <NewsCard imgUrl={ari.urlToImage} title={ari.title} des={ari.description} newsURL={ari.url} newsDate={ari.publishedAt}
       source={ari.source.name} />
        </div>
      

    })

    }
  </div>
<div className='flex justify-between'>
  <button disabled={page<=1} onClick={()=>{setPage(p=> p -1, 1)}} className='h-[50px] w-[120px] bg-gray-600 text-white text-xl  rounded-2xl ml-[15px] mb-[20px]'>Previous</button>
  <button onClick={handleNext} className='h-[50px] w-[120px] bg-gray-600 text-white text-xl  rounded-2xl mr-[15px] mb-[20px] '>Next</button>
</div>
</div>

    
  )
}

export default News
