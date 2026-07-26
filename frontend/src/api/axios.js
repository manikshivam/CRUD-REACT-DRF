import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


// Request Interceptor
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


// Response Interceptor
api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const refresh = localStorage.getItem("refresh");

                if (!refresh) {
                    throw new Error("No Refresh Token");
                }

                const response = await axios.post(
                    BASE_URL + "refresh/",
                    {
                        refresh: refresh,
                    }
                );

                const newAccess = response.data.access;

                localStorage.setItem("access", newAccess);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return api(originalRequest);

            } catch (err) {

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                window.location.href = "/";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;