import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { user } = useAuth();

    return (

        <div className="bg-white h-16 border-none border-b bg-gradient-to-r from-blue-100 to-blue-900 px-8 flex justify-between items-center">


            <div>

                Welcome,

                <span className="font-bold">

                    {" Mr. " + user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}

                </span>

            </div>

        </div>

    );

}