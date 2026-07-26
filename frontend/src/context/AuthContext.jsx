import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async (token) => {
        try {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/profile/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(res.data.data);
        } catch (err) {
            console.log(err);
            logout();
        }
    };

    useEffect(() => {
        const access = localStorage.getItem("access");

        if (access) {
            fetchUser(access);
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (tokens) => {
        localStorage.setItem("access", tokens.access);
        localStorage.setItem("refresh", tokens.refresh);

        await fetchUser(tokens.access);
    };

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
    };

    useEffect(() => {
        if (user !== null || !loading) {
            setLoading(false);
        }
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);