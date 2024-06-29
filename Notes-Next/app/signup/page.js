"use client"
import Nav from '@/components/Nav'
import React from 'react'
import { useState } from 'react';
import app from '@/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
export default function page() {
    const router = useRouter();
    const auth = getAuth(app)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleSignUp(e){
      e.preventDefault();
      try {
        const user = await createUserWithEmailAndPassword(auth,email,password);
        if(user){
          router.push('/')
        }
        
      } catch (error) {
        alert(error)
      }
    }
  return (
    <div className='flex flex-col justify-center items-center bg-white min-h-screen'>
      <Nav/>
      <form className="flex flex-col items-center justify-between mb-16 lg:mb-36 border border-gray-200  rounded-md w-3/6 lg:w-4/12" onSubmit={handleSignUp} >
      <h1 className="text-2xl text-yellow-600 font-mono font-semibold pt-12">
        ToDo
      </h1>
      <div className="my-10 flex flex-col gap-2 items-center min-w-full">
        <input
          type="email"
          placeholder="email.."
          className="w-3/5 focus:outline-none border border-gray-200 focus:border-2 h-8 px-2 xs:w-2/5"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password.."
          className="w-3/5 focus:outline-none border border-gray-200 focus:border-2 h-8 px-2 xs:w-2/5"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="bg-yellow-600 py-1 w-3/5 text-white text-lg font-semibold hover:bg-yellow-700 xs:w-2/5" >
          Sign Up
        </button>
      </div>
      <span className="text-sm pb-12">
        Already a member?{" "}
        <a href="/">
          <span className="text-yellow-600">LogIn</span>
        </a>
      </span>
    </form>
    </div>
  )
}
