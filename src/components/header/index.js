"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { MdDarkMode, MdLightMode, MdOutlineSearch, MdNotifications } from 'react-icons/md';
import { FaExclamationCircle } from "react-icons/fa";
import { ThemeContext } from "@/context/ThemeContext"
import Breadcrumbs from "../breadcrumbs";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
export default function Header() {
  const { switchDark, switchLight, theme } = useContext(ThemeContext);

  const router = useRouter();
  // const { data: session } = useSession();
  // const user = session?.user;
  // console.log( user)
  return (
    <header className="sticky top-0 z-999 flex flex-wrap w-full bg-default dark:bg-black dark:text-white">
      <div className="flex flex-grow items-center gap-2 justify-end py-4 px-4 md:px-6 2xl:px-11 w-full">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button className="inline-flex items-center justify-center bg-black px-6 py-2 text-lg text-white font-medium tracking-wide uppercase">
          </button>
        </div>
        <div className="w-full md:w-auto flex flex-grow items-center justify-between gap-2">
          <div className="w-full md:w-auto">
            <div className="font-bold text-2xl">
              <h1>EDS Dashboard</h1>
            </div>
            <div className="flex ">
              <Link key="home" className="text-purple" href="/"><AiFillHome size={20} /></Link>
              <Breadcrumbs />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full py-2 px-4 border-white bg-white dark:bg-defaultdark shadow flex md:items-center md:justify-between gap-2 text-graylight text-xl">
                <div className="relative flex items-center">
                  <div className="w-4 h-4 absolute ml-2 text-graylight ">
                    <MdOutlineSearch />
                  </div>
                  <input
                    type="text"
                    className="w-full h-10 pr-10 pl-8 text-sm bg-default rounded-full py-2 px-3 lg:w-80 focus:outline-none text-black"
                    placeholder="Search "
                  />
                </div>
                {/* <div>
                  <MdNotifications />
                </div> */}
                <div>
                  <button className="text-graylight pt-2" onClick={theme === "dark" ? switchLight : switchDark}>
                    {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
                  </button>
                </div>
                {/* <div>
                  <FaExclamationCircle />
                </div> */}
                <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/login"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Login</span>
                </Link>
              </li>
              <li className="nav-item">
               
              </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}