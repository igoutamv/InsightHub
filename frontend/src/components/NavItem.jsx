import { NavLink } from "react-router-dom";

export default function NavItem({ to, icon: Icon, label }) {

    return (

        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                }`
            }
        >

            <Icon size={18} />

            {label}

        </NavLink>

    );

}