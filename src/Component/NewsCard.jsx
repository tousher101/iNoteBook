import React from 'react'
import noImage from '../../src/assets/noimage.png'

function NewsCard(props) {
  return (
 <div className='mt-[30px] h-[550px] p-[10px] rounded-2xl m-[10px] bg-[#1E293B] relative hover:scale-95 duration-500 border shadow-lg'>
    <div>
        <img className='object-fill rounded-2xl mb-[10px]' src={props.imgUrl?props.imgUrl:noImage}/>
        <span className='bg-amber-800 text-white p-2 rounded-xl absolute top-[10px] right-[10px]'>{props.source}</span>
    </div>
    <div className='p-[10px] rounded-2xl'>
        <h2 className='text-[22px] front-bold text-white'>{props.title}</h2>
        <h2 className='text-[15px] text-white'>{props.des}</h2>
    </div>
    <div className='mt-[10px absolute bottom-[20px] right-[10px] bg-green-500 p-[5px] rounded-xl'> <a href={props.newsURL} target='_blank' className='p-[8px] rounded-xl text-white '>Read More</a></div>
    <div className='text-[15px] absolute bottom-[20px] left-[10px] text-white'><p>Date: {new Date(props.newsDate).toGMTString()}</p></div>

 </div>
  )
}

export default NewsCard
