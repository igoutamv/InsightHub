import NavItem from "./NavItem";
import {
    LayoutDashboard,
    Upload,
    FolderOpen,
    User,
    LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

        navigate("/login");

    };

    const item =
        "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100";

    return (

        <div className="w-64  bg-gradient-to-b from-blue-100 to-blue-50 h-screen border-r bg-white p-5">

            <h1 className=" pl-4 text-2xl font-bold mb-8">
                InsightHub
            </h1>

            <nav className="space-y-2">

                <NavItem
                    to="/dashboard"
                    icon={LayoutDashboard}
                    label="Dashboard"
                />



                <NavItem
                    to="/documents"
                    icon={FolderOpen}
                    label="Documents"
                />

                <NavItem
                    to="/upload"
                    icon={Upload}
                    label="Upload"
                />
                
                <NavItem
                    to="/profile"
                    icon={User}
                    label="Profile"
                />

                <button
                    onClick={logout}
                    className={`${item} cursor-pointer text-red-600 w-full`}
                >
                    <LogOut size={18} />
                    Logout
                    
                    </button>

            </nav>

        </div>

    );

}