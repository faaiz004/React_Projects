import React, { useEffect, useState } from "react";
import { orderBy } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context";
import Nav from "./Nav";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
const db = getFirestore();
const colRef = collection(db, "notes");
export default function Dashboard() {
  const [docs, setDocs] = useState([]);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser == null) {
      navigate("/");
    } else {
      setLoading(true);
      const q = query(
        colRef,
        where("email", "==", currentUser.email),
        orderBy("createdAt", "desc")
      );
      getDocs(q).then((snapshot) => {
        const newDocs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocs(newDocs);
        setLoading(false);
      });
    }
  }, [currentUser]);
  console.log(docs);
  const displayDocs = docs.map((doc, index) => {
    return (
      <div className={`flex items-center justify-between gap-4 w-3/5 px-3 py-2 ${index % 2 === 0 ? 'bg-white shadow-md border-t-0 border-gray-100' : 'bg-gray-200'}`}>
        <span className={`font-mono ${doc.Completed?'line-through text-gray-600':'text-gray-800'}`}>
          {doc.Text}
        </span>
        <button
          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 active:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          onClick={() => {
            navigate(`/dashboard/${doc.id}`);
          }}
        >
          Edit
        </button>
      </div>
    );
  });

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
        email: currentUser.email,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    const q = query(
      colRef,
      where("email", "==", currentUser.email),
      orderBy("createdAt", "desc")
    );
    setLoading(true);
    getDocs(q).then((snapshot) => {
      const newDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(newDocs);
      setLoading(false);
    });
  }
  return currentUser ? (
    <div className="min-h-screen flex flex-col items-center gap-16">
      <Nav />
      <form
        className="mt-32 lg:mt-44 flex items-center h-16 gap-2 border-black w-full justify-center"
        onSubmit={postData}
      >
        <input
          className="px-2 py-0.5 focus:outline-none border border-gray-200 focus:border-2 w-2/5 lg:w-2/6 h-10"
          placeholder="write note.."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          name="text"
        />
        <button className="bg-yellow-600 h-10">
          <span className="text-white font-mono px-2  hover:bg-yellow-700">
            Post
          </span>
        </button>
      </form>
      {loading ? (
        <div className="min-h-screen flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
            className="animate-spin h-8 text-yellow-600"
          >
            <path
              fill-rule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">{displayDocs}</div>
      )}
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
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
    </div>
  );
}
