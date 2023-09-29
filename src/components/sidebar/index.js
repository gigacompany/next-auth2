'use client'
import React, { useContext, useEffect, useState } from "react";
import { AiFillHome, AiOutlineTransaction } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.jpg";
import { useSession, signOut } from "next-auth/react"; // Import useSession and signOut
import AuthContext from "@/context";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <AiFillHome size={25} />,
  },
  {
    id: "transaction",
    label: "Transaction",
    path: "/transaction",
    icon: <AiOutlineTransaction size={25} />,
  },
  {
    id: "reports",
    label: "Reports",
    path: "/reports",
    icon: <BiSolidReport size={25} />,
  },
  {
    id: "admin",
    label: "Admin",
    path: "/admin",
    icon: <RiAdminFill size={25} />,
  },
  {
    id:"login",
    label:'Login',
    path:'/login1',
    icon:'<-'
  }
];


export default function Sidebar() {
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(AuthContext); // Local state to manage sidebar open/close
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession(); // Use useSession to get the session status

  const handleNavigate = (getMenuItem) => {
    if (session && getMenuItem.id === "login") {
      // If user is authenticated and clicks on "Login", log them out
      signOut({ callbackUrl: "/login1" }); // Redirect to /login1 after logout
      return;
    }

    if (!session && getMenuItem.id === "login") {
      // If user is not authenticated and clicks on "Login", redirect to /login1
      router.push("/login1");
      return;
    }

    if (session) {
      // Handle other menu item clicks for authenticated users
      router.push(getMenuItem.path);
      setActiveMenuItem(getMenuItem.id);
    }
  };

  useEffect(() => {
    // Close the sidebar when navigating to /login1
    if (pathName === "/login1") {
      setSidebarOpen(false);
    }
  }, [pathName]);

  return (
    <aside
      className={`absolute left-0 top-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full" // Use CSS to handle open/close animation
      } h-screen w-72.5 flex flex-col overflow-y-hidden light:bg-white dark:bg-defaultdark light:text-black dark:text-white duration-300 ease-linear lg:static lg:translate-x-0`}
    >
      <div className="flex items-center lg:m-4 lg:px-9 border-none">
        <Image src={logo} alt="logo" width={150} height={150} />
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="lg:py-6 px-4 lg:px-6 border-t border-graylight">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <label
                    onClick={() => {
                      handleNavigate(menuItem);
                      closeSidebar(); // Close the sidebar on menu item click
                    }}
                    className={`group relative cursor-pointer flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium duration-300 ease-in-out
                             ${
                               pathName.includes(menuItem.id) && "light:text-black "
                             }
                             ${
                               activeMenuItem !== menuItem.id &&
                               "text-graylight"
                             }
                            `}
                  >
                    {menuItem.id === activeMenuItem ? (
                      <span className="text-purple">{menuItem.icon}</span>
                    ) : (
                      menuItem.icon
                    )}
                    {menuItem.label}
                  </label>
                </li>
              ))}
              <li>
                <label
                  onClick={() => {
                    handleNavigate({ id: "login", path: "/login1" });
                    closeSidebar(); // Close the sidebar on "Login"/"Logout" button click
                  }}
                  className="group relative cursor-pointer flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium duration-300 ease-in-out"
                > 
                  {session ? (
                    // If user is authenticated, show "Logout" button
                    <>
                      <span className="text-purple">🚪</span>
                      Logout
                    </>
                  ) : (
                    // If user is not authenticated, show "Login" button
                    <>
                      <span className="text-purple">🔑</span>
                      Login
                    </>
                  )}
                </label>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}