import { Outlet, Navigate } from 'react-router-dom';

const PrivateRouter = (auth) => {
    return auth.auth ?  <Outlet /> : <Navigate to="/login" replace="true" />
};

export default PrivateRouter;
