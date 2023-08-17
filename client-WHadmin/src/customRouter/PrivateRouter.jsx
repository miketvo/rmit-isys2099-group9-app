import { Outlet, Navigate } from 'react-router-dom';


const PrivateRouter = () => {
    const firstLogin = localStorage.getItem("firstLogin");    // Access website by localStorage
    return firstLogin ?  <Outlet /> : <Navigate to="/login" replace="true" />;
};

export default PrivateRouter;