import { getServerSession } from "next-auth";
import DashboardLayout from "@/components/dashboard/page";
import Sidebar from "@/components/sidebar";
import User from "@/components/user/page";
import Transaction from "./transaction/page";
import Dashboard from "./dashboard/page";
import Header from "@/components/header";
import { useSession } from "next-auth/react";
import Login from "./login1/page";
import { useRouter } from "next/navigation";
import FullLayout from "./FullLayout";

export default function Home() {


  // Check if there is an active session
  // if (!session) {
  //   // Redirect to the login page if there is no session
  //   router.push("/login"); // Replace "/login" with the actual login page URL
  //   return null; // Return null to avoid rendering anything else on this page
  // }

  // If there is an active session, render the dashboard components
  return (
    <div>
     <Dashboard/>
    </div>
  );
}
