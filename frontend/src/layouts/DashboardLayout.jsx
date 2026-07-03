import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-8 bg-gradient-to-tr from-white to-indigo-100 min-h-[calc(100vh-64px)]">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}