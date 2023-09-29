
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

import { ThemeProvider } from "@/context/ThemeContext";
import NextAuthProvider from "@/auth-provider/page";
import { AuthProvider } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EDS Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <AuthProvider>
        <ThemeProvider>
        <main>
            <div className="flex h-screen overflow-hidden rounded-lg">
              <Sidebar  />
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
                <Header />
                  <div  className="h-screen p-4 md:p-6 2xl:p-10 bg-default dark:bg-black dark:text-white  ">
                    {children}
                  </div>
                
              </div>
            </div>
          </main>
            </ThemeProvider>
            </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}