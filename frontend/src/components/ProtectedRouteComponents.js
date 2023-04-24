import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteComponent = ({ user }) => {

    const curUser = localStorage.getItem("user");
    if (curUser) {
        return <Outlet />
    }
    return <Navigate to="/require-login" />
}


export default ProtectedRouteComponent; 