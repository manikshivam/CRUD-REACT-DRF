import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import Loader from "../components/Loader";

const Dashboard = () => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const response = await getProfile();

            // DRF Response:
            // {
            //    success:true,
            //    data:{id,username,email}
            // }

            setProfile(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return <Loader />;
    }

    return (

        <>

            <h2 className="fw-bold mb-4">
                Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h5>User Information</h5>

                            <hr />

                            <p>
                                <strong>ID :</strong> {profile?.id}
                            </p>

                            <p>
                                <strong>Username :</strong> {profile?.username}
                            </p>

                            <p>
                                <strong>Email :</strong> {profile?.email}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-8">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h5>Welcome 👋</h5>

                            <hr />

                            <p>
                                Congratulations! Your React + Django REST Framework JWT authentication is working successfully.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

};

export default Dashboard;