import { useAuth } from "../auth/AuthProvider";
import { Navigate } from 'react-router-dom';
import { routeMap } from "./routeMap";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuth();

  return user ? <Component {...rest} /> : <Navigate to={routeMap.LOGIN} replace />;
};

export default PrivateRoute;