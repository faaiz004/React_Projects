import React, { useState } from 'react'
import app from '../firebase';
import Nav from './Nav'
import { useAuth } from './Context';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const navigate = useNavigate()
    const {currentUser,setCurrentUser,signup} = useAuth()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    async function handleSubmit(e) {
      e.preventDefault()
      const auth = getAuth(app);
      try{
        const user = await signup(email,password);
        if(user != null){
          navigate('/dashboard')
        }
      }catch(error){
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(`${errorCode} : ${errorMessage}`)
      }
      console.log(currentUser.email)
    }

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center'>
        <Nav/>
      <form className='flex flex-col items-center justify-between mb-16 lg:mb-36 border border-gray-200  rounded-md w-3/6 lg:w-4/12' onSubmit={handleSubmit}>
        <h1 className='text-2xl text-yellow-600 font-mono font-semibold pt-12'>Notes</h1>
        <div className='my-10 flex flex-col gap-2 items-center min-w-full'>
            <input type='email' placeholder='email..' className='w-3/5 focus:outline-none border border-gray-200 focus:border-2 h-8 px-2' value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <input type='password' placeholder='password..' className='w-3/5 focus:outline-none border border-gray-200 focus:border-2 h-8 px-2' value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <button className='bg-yellow-600 py-1 w-3/5 text-white text-lg font-semibold hover:bg-yellow-700'>Sign Up</button>
        </div>
        <span className='text-sm pb-12'>Already a member? <a href='/signup'><span className='text-yellow-600 '>Login</span></a></span>
      </form>
    </div>
  )
}
