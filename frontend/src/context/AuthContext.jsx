import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");

        if (access && refresh) {
            setUser({
                access,
                refresh,
            });
        }

        setLoading(false);
    }, []);

    const login = (tokens) => {

        localStorage.setItem("access", tokens.access);
        localStorage.setItem("refresh", tokens.refresh);

        setUser(tokens);
    };

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);
    };

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

export default AuthContext;

export const useAuth = () => useContext(AuthContext);