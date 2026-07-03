import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {

                setLoading(false);

                return;
            }

            try {

                const res = await getCurrentUser();

                setUser(res.data.data);

            } catch {

                localStorage.removeItem("token");

            }

            setLoading(false);

        };

        fetchUser();

    }, []);

    return (

        <AuthContext.Provider

            value={{
                user,
                setUser,
                loading
            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);