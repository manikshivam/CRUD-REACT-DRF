import api from "../api/axios";

// Register User
export const registerUser = async (data) => {
    const response = await api.post("register/", data);
    return response.data;
};

// Login User
export const loginUser = async (data) => {
    const response = await api.post("login/", data);
    return response.data;
};

// Get Logged In User
export const getProfile = async () => {
    const response = await api.get("profile/");
    return response.data;
};

// Refresh Token (optional - axios interceptor already handles it)
export const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");

    const response = await api.post("refresh/", {
        refresh,
    });

    return response.data;
};

// Logout
export const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};