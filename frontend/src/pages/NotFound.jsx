import { Link } from "react-router-dom";

const NotFound = () => {

    return (

        <div className="container text-center mt-5">

            <h1 className="display-1 fw-bold">
                404
            </h1>

            <p className="lead">
                Page Not Found
            </p>

            <Link
                to="/dashboard"
                className="btn btn-primary"
            >
                Go Dashboard
            </Link>

        </div>

    );

};

export default NotFound;