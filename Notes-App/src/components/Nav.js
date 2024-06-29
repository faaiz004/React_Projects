import React from 'react'

export default function Nav() {
  return (
    <nav className='px-4 flex items-center justify-between lg:px-16 py-2 shadow-md fixed min-w-full top-0'>
        <h1 className='font-semibold text-yellow-600 font-sans text-2xl lg:text-3xl'>Notes</h1>
        <div className='flex gap-4 items-center'>
        <a href='/'><span className='text-black font-sans cursor-pointer hover:underline lg:text-xl' >Login</span></a>
        <a href='/signup'><span className='text-black font-sans cursor-pointer hover:underline lg:text-xl'>SignUp</span></a>
        </div>
    </nav>
  )
}
