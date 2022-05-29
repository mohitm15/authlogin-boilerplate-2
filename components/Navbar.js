import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font w-full">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Mohit Maroliya</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
            <Link href={"/"}>
              <a className="mr-5 hover:text-white">Home</a>
            </Link>
            <Link href={"/about"}>
              <a className="mr-5 hover:text-white">About</a>
            </Link>
          </nav>
          <div className="flex flex-row space-x-2">
          <button className="inline-flex items-center bg-blue-800 text-white border-2 border-white rounded-lg py-1 px-3  focus:outline-none hover:bg-blue-600 text-base mt-4 md:mt-0">
            <Link href={"/login"} ><a>Login</a></Link>
          </button>
          <button className="inline-flex items-center bg-blue-800 text-white border-2  border-white rounded-lg py-1 px-3  focus:outline-none hover:bg-blue-600 text-base mt-4 md:mt-0">
              <Link href={"/signup"}><a>SignUp</a></Link>
          </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
