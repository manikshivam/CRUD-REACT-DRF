import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || "/dashboard";

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!form.username || !form.password) {
            setError("Username and Password are required.");
            return;
        }

        try {
            setLoading(true);

            const response = await loginUser(form);

            login(response);

            navigate(from, { replace: true });

        } catch (err) {

            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Login failed. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">

            <div className="row justify-content-center align-items-center vh-100">

                <div className="col-md-5">

                    <div className="card shadow-lg border-0 rounded-4">

                        <div className="card-body p-5">

                            <h2 className="text-center fw-bold mb-4">
                                Login
                            </h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <div className="input-group">

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>

                                    </div>

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>

                            </form>

                            <hr />

                            <p className="text-center">

                                Don't have an account?

                                <Link
                                    to="/register"
                                    className="ms-2"
                                >
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;