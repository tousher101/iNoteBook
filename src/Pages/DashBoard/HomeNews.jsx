import React from 'react'
import { NavLink, Outlet,} from 'react-router-dom'



function HomeNews() {
  const categories=['business','sports','health','entertainment','science','technology']
  return (
    <>
 
    <section className='max-w-[1380px] mx-auto'>
      <div className='max-w-[1380px] h-[60px] bg-[#E9E4F0] shadow-lg flex justify-around items-center mt-[10px] mx-[20px] rounded-2xl text-xl
      font-[Poppins]'>
  {categories.map((cat)=>{ return(
    <NavLink key={cat} to={`/home/news/${cat}`} className={({isActive})=>isActive?'text-blue-600 font-bold':'text-gray-800'}>{cat.charAt(0).toUpperCase()+cat.slice(1)}</NavLink>

  )})}
      </div>
    </section>
      <Outlet/>
 

    </>
  )
}

export default HomeNews
