import { Link, useRouteError } from "react-router-dom";
const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center" id="error-page">

                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="my-3">
                    <i>{error.status} </i>
                    <i>{error.statusText || error.message}</i>
                </p>
                <Link className="bg-red-500 p-3 rounded-lg text-white font-medium" to="/">Go Back To Home</Link>
            </div>
        </div>

    );
};

export default ErrorPage;