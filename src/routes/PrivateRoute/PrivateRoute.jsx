
import { useContext } from "react";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);
    if(loading){
        return <span className=" items-center text-center loading loading-spinner text-success loading-lg"></span>
    }

    if (user){
        return children;
    }
    return <Navigate to="/login"></Navigate>

};

PrivateRoute.propTypes = {
    children: PropTypes.object.isRequired
}


export default PrivateRoute; 