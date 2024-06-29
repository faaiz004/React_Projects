import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
export default function Nav() {
  return (
    <nav className="flex justify-between px-10 py-2 lg:px-16 fixed min-w-full items-center shadow-md top-0">
      <h1 className="font-semibold font-mono text-2xl text-yellow-600">ToDo</h1>
      <div className="flex items-center justify-center gap-4 text-gray-600 font-mono">
        <span className="hover:text-gray-800 cursor-pointer" onClick={signOut}>LogOut</span>
        <Link to href={"/"}>
          <span className="hover:text-gray-800">LogIn</span>
        </Link>
        <Link to href={"/signup"}>
          <span className="hover:text-gray-800">SignUp</span>
        </Link>
      </div>
    </nav>
  );
}
