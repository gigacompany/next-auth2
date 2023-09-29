"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      setLoader(false);
    } else if (status === "authenticated" && pathName.includes("/dashboard")) {
      router.push("/unauth-page");
      setLoader(false);
    } else if (status === "authenticated") {
      setLoader(false);
    } else {
      router.push("/login1");
      setLoader(false);
    }
  }, [status, pathName, router]);

  if (loader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader color="#000000" loading={loader} size={35} data-textid="Loader" />
      </div>
    );
  }


  return (
    <AuthContext.Provider
      value={{
        // You can add any context values you need here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
