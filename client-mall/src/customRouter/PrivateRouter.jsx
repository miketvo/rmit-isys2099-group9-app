import {useLocation, Outlet, Navigate } from 'react-router-dom';

const PrivateRouter = () => {
    const firstLogin = localStorage.getItem("userInfo")
    const location = useLocation();

    return firstLogin
    ? <Outlet /> 
    : <Navigate to="/login" state={{from: location}} replace />;
};


export default PrivateRouter;