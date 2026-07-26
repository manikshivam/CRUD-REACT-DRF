import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const PrivateRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Wait until auth state is initialized
    if (loading) {
        return <Loader />;
    }

    // Redirect to login if not authenticated
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // Render protected pages
    return <Outlet />;
};

export default PrivateRoute;