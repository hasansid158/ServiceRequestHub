import { Routes, Route } from 'react-router-dom';
import { routeMap } from './routeMap';

import { Dashboard } from '../../pages/Dashboard';
import { AuthPage } from '../../pages/authPages/AuthPage';

import PrivateRoute from '../auth/PrivateRoute';

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path={routeMap.LOGIN} element={<AuthPage />} />
    <Route path={routeMap.SIGNUP} element={<AuthPage />} />

    {/* Protected Routes */}
    <Route path={routeMap.DASHBOARD} element={<PrivateRoute element={Dashboard} />} />
  </Routes>
);

export default AppRoutes;