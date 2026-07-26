import React from "react";

const Loader = ({
    text = "Loading...",
    fullScreen = true,
}) => {

    if (fullScreen) {
        return (
            <div
                className="d-flex justify-content-center align-items-center vh-100 bg-light"
            >
                <div className="text-center">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <h5 className="mt-3">{text}</h5>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center py-5">
            <div
                className="spinner-border text-primary"
                role="status"
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>

            <p className="mt-3">{text}</p>
        </div>
    );
};

export default Loader;