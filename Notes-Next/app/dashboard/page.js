"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import app from "@/firebase";
import { orderBy } from "firebase/firestore";
import Timer from "@/components/Timer";
import { useRouter } from "next/navigation";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
const db = getFirestore(app);
const colRef = collection(db, "notes");



export default function page() {
  const router = useRouter()
  const [docs, setDocs] = useState([]);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });
  const [sliderVal, setSliderVal] = useState(1);
  const [showTimer, setShowTimer] = useState(false);
  const [text, setText] = useState("");
  {
    session ? console.log(session) : "";
  }
  useEffect(() => {
    if (session && session.user) {
      getData();
    }
  }, [session]);
  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <span className="font-mono text-black">Loading</span>
      </div>
    );
  }

  async function getData() {
    const q = query(
      colRef,
      where("email", "==", session.user.email),
      orderBy("Completed","asc"),
      orderBy("createdAt", "desc")
    );
    getDocs(q).then((snapshot) => {
      const newDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(newDocs);
    });
  }

  async function postData(e) {
    e.preventDefault();
    if (!text) {
      alert("text field can't be empty");
      return;
    }
    let space = true;
    for (let i = 0; i < text.length; i++) {
      if (text[i] != " ") {
        space = false;
      }
    }
    if (space) {
      alert("text field can't be empty");
      return;
    }
    try {
      await addDoc(colRef, {
        Completed: false,
        Text: text,
        Time: sliderVal,
        email: session.user.email,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    getData();
  }

  const displayDocs = docs.map((doc, index) => {
    return (
      <div
        className={`flex items-center justify-between gap-4 w-3/5 px-3 py-2 ${
          index % 2 === 0
            ? "bg-white shadow-md border-t-0 border-gray-100"
            : "bg-gray-200"
        }`}
      >
        <span
          className={`font-mono ${
            doc.Completed ? "line-through text-gray-600" : "text-gray-800"
          }`}
        >
          {doc.Text}
        </span>
        <button
          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 active:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 p-2"
          onClick={() => {router.push(`/dashboard/${doc.id}`)}}
        >
          Edit
        </button>
      </div>
    );
  });
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 gap-16">
      <Nav />
      <form className="mt-32 lg:mt-44 flex items-center h-16 gap-2 border-black w-full justify-center relative">
        <Timer
          showTimer={showTimer}
          sliderVal={sliderVal}
          setSliderVal={setSliderVal}
          setShowTimer={setShowTimer}
        />
        <input
          className="px-2 py-0.5 focus:outline-none border border-gray-200 focus:border-2 w-2/5 lg:w-2/6 h-10"
          placeholder="write note.."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          name="text"
        />
        <button
          className="bg-yellow-600 h-10 hover:bg-yellow-700"
          onClick={postData}
        >
          <span className="text-white font-mono px-2 ">Post</span>
        </button>
      </form>
      <div className="flex flex-col items-center w-full lg:w-3/5">
        {displayDocs}
      </div>
    </div>
  );
}
page.requiredAuth = true;
