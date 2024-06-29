"use client"
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Home() {
  const session = useSession()
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() =>{
    if(session){
      if(session.status == "authenticated"){
        router.push('/dashboard');
      }
    }
  },[session])
  async function handleSignIn(e){
    if(!email || !password){
      return alert("Password and email field empty")
    }
    e.preventDefault()
    await signIn('credentials',{
      email:email,
      password:password,
      redirect:false
    })
    if(session){
      console.log(session)
      if(session.status == "authenticated"){
        router.push('/dashboard')
        return;
      }else{
        alert('invalid email or password')
      }
    }else{
      alert('something went wrong')
    }
    console.log(session)
    
  }
  return (
    <main className="flex flex-col min-h-screen bg-white items-center justify-center">
      <Nav />
      <div className="flex flex-col items-center justify-between mb-16 lg:mb-36 border border-gray-200  rounded-md w-3/6 lg:w-4/12" >
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
          <button className="bg-yellow-600 py-1 w-3/5 text-white text-lg font-semibold hover:bg-yellow-700 xs:w-2/5" onClick={handleSignIn} >
            Log In
          </button>
          <span className="font-mono text-sm p-2">or</span>
          <button className="w-3/5 py-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold xs:w-2/5" type="button" onClick={() => signIn('google')} >Sign In with Google</button>
        </div>
        <span className="text-sm pb-12">
          Aren't a member?{" "}
          <a href="/signup">
            <span className="text-yellow-600">Sign Up</span>
          </a>
        </span>
      </div>
    </main>
  );
}
