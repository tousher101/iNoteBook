import React from 'react'
import { NavLink, Outlet,} from 'react-router-dom'
import menuIcon  from '../../assets/bx-menu.svg'
import closeIcon from '../../assets/bx-x.svg'



function HomeNews() {
  const categories=['business','sports','health','entertainment','science','technology']
  return (
    <>
 
    <section className='max-w-[1380px] mx-auto  '>
      <div className='max-w-[1380px] h-[60px] bg-[#E9E4F0] shadow-lg flex justify-around items-center mt-[10px] mx-[20px] rounded-2xl text-xl
      font-[Poppins] lg:flex md:hidden hidden'>
  {categories.map((cat)=>{ return(
    <NavLink key={cat} to={`/home/news/${cat}`} className={({isActive})=>isActive?'text-blue-600 font-bold':'text-gray-800'}>{cat.charAt(0).toUpperCase()+cat.slice(1)}</NavLink>

  )})}
      </div>
    </section>



        <section className='max-w-[1380px] mx-auto  '>
        <input type='checkbox' id='toggle-news' className='hidden peer/news'/>
        <label htmlFor='toggle-news' className='lg:hidden cursor-pointer top-17 right-0  absolute z-5 bg-white rounded-2xl'>
            <img className='w-8' src={menuIcon}/>
        </label>
        <aside className='fixed top-17 rounded-l-2xl right-0 h-full bg-[#E9E4F0] w-[150px] transition-transform duration-1000 - translate-x-full peer-checked/news:translate-x-0 z-5'>
        <div className=' '>
          <label className='cursor-pointer' htmlFor='toggle-news'> <img className='w-8' src={closeIcon}/> </label>
        </div>
          <div className='grid grid-cols-1 justify-end space-y-10 p-4 font-semibold'>
          {categories.map((cat)=>{ return(
            <NavLink  key={cat} to={`/home/news/${cat}`} className={({isActive})=>isActive?'text-blue-600 font-bold':'text-gray-800'}>{cat.charAt(0).toUpperCase()+cat.slice(1)}</NavLink>)
  })}
          </div>
      
        </aside>

     
    </section>







    
      <Outlet/>
 

    </>
  )
}

export default HomeNews
