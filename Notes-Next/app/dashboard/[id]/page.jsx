'use client'
import Nav from '@/components/Nav'
import React, { useEffect, useState } from 'react'
import app from '@/firebase';
import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
const db = getFirestore(app);
export default function page({params}) {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
          redirect("/");
        },
      });
      const router = useRouter()
      const [deleted,setDeleted] = useState(false);
      const [loading, setLoading] = useState(false);
      const {id} = params;
      const [completed,setCompleted] = useState(false);
      const [text,setText] = useState("");
      useEffect(() =>{
        const docRef = doc(db,"notes",id)
        setLoading(true)
        getDoc(docRef).then((docData) =>{
            if(docData.exists()){
                const docContent = docData.data();
                setText(docContent.Text)
                setCompleted(docContent.Completed)
                setLoading(false)
            }
        })
      },[])
      async function handleChange(e){
        const docRef = doc(db,'notes',id)
        if(deleted){
            await deleteDoc(docRef);
            router.push('/dashboard');
            return;
        }
      
      await updateDoc(docRef,{
        Text:text,
        Completed:completed,
      })
      router.push('/dashboard')
    }



      if (status === "loading") {
        return (
          <div className="min-h-screen flex justify-center items-center bg-white">
            <span className="font-mono text-black">Loading</span>
          </div>
        );
      }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white">
      <Nav />
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
          className="animate-spin h-8"
        >
          <path
            fill-rule="evenodd"
            d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
            clip-rule="evenodd"
          />
        </svg>
      ) : (
        <div className="border-2 border-gray-50 w-3/5 lg:3/6 flex flex-col gap-4 items-center shadow-lg p-2">
          <input
            type="text"
            className="focus:outline-none border focus:border-2 border-gray-200 px-2 py-0.5 w-3/5"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div className="flex items-center gap-4 ">
            <span className="text-black font-mono">Completed</span>
            <input
              type="checkbox"
              onChange={(e) => {
                setCompleted(e.target.checked);
              }}
              checked={completed}
            />
          </div>
          <div className="flex items-center gap-4 ">
            <span className="text-black font-mono">Delete</span>
            <input
              type="checkbox"
              onChange={(e) => {
                setDeleted(e.target.checked);
              }}
              checked={deleted}
            />
          </div>
          <button className="bg-yellow-600 font-mono text-white w-3/5 py-1" onClick={handleChange}>
            Confirm Changes
          </button>
        </div>
      )}
    </div>
  );
}
