import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !form.username ||
            !form.email ||
            !form.password ||
            !form.confirmPassword
        ) {
            setError("All fields are required.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            await registerUser({
                username: form.username,
                email: form.email,
                password: form.password,
            });

            setSuccess("Registration successful. Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {

            if (err.response?.data) {

                const errors = Object.values(err.response.data)
                    .flat()
                    .join(" ");

                setError(errors);

            } else {

                setError("Registration failed.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center align-items-center vh-100">

                <div className="col-lg-5">

                    <div className="card shadow-lg border-0 rounded-4">

                        <div className="card-body p-5">

                            <h2 className="text-center fw-bold mb-4">
                                Create Account
                            </h2>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success">
                                    {success}
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

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                    />

                                </div>

                                <button
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >

                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Registering...
                                        </>
                                    ) : (
                                        "Register"
                                    )}

                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0">

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="ms-2"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Register;