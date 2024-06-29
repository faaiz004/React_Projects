import React, { useState } from "react";
import Nav from "./Nav";
import { useAuth } from "./Context";
import { Navigate,useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {currentUser,login,signInGoogle} = useAuth();
  async function handleSubmit(e){
    e.preventDefault()
    try {
      const user = await login(email,password)
      if(user != null){
        navigate('/dashboard')
      }
      
    } catch (error) {
      alert(error)
    } 
  }

  async function handleGoogle(e){
    try{
      const user = await signInGoogle()
      if(user != null){
        navigate('/dashboard')
      }
    }catch(e){
      alert(e)
    }
  }

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center"
      
    >
      <Nav />
      <form className="flex flex-col items-center justify-between mb-16 lg:mb-36 border border-gray-200  rounded-md w-3/6 lg:w-4/12" >
        <h1 className="text-2xl text-yellow-600 font-mono font-semibold pt-12">
          Notes
        </h1>
        <div className="my-10 flex flex-col gap-2 items-center min-w-full">
          <input
            type="email"
            placeholder="email.."
            className="w-3/5 focus:outline-none border border-gray-200 focus:border-2 h-8 px-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password.."
            className="w-3/5 focus:outline-none border border-gray-200 focus:border-2 h-8 px-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="bg-yellow-600 py-1 w-3/5 text-white text-lg font-semibold hover:bg-yellow-700" onClick={handleSubmit}>
            Log In
          </button>
          <span className="font-mono text-sm p-2">or</span>
          <button className="w-3/5 py-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold" type="button" onClick={handleGoogle}>Sign In with Google</button>
        </div>
        <span className="text-sm pb-12">
          Aren't a member?{" "}
          <a href="/signup">
            <span className="text-yellow-600">Sign Up</span>
          </a>
        </span>
      </form>

    </div>
  );
}
