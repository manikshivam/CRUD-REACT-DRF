import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Todos from "./pages/Todos";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <Routes>

            {/* Redirect Root */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* Public Routes */}
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                    <Route
    path="/todos"
    element={<Todos/>}
/>

                </Route>
            </Route>

            {/* 404 */}
            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default App;