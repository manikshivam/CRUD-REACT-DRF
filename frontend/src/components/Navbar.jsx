import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/dashboard">
                    Welcome
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <NavLink
                                to="/dashboard"
                                className="nav-link"
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">

    <NavLink
        to="/todos"
        className="nav-link"
    >
        Todos
    </NavLink>

</li>

                        <li className="nav-item">
                            <NavLink
                                to="/profile"
                                className="nav-link"
                            >
                                Profile
                            </NavLink>
                        </li>

                        {user && (
                            <li className="nav-item dropdown">

                                <a
                                    href="#"
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Welcome
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end">

                                    <li>
                                        <span className="dropdown-item-text">
                                            {user?.username || "No User"}
                                        </span>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>

                                </ul>

                            </li>
                        )}

                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;