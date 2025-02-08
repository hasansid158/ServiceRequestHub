import { Routes, Route, Navigate } from 'react-router-dom';
import { routeMap } from './routeMap';

import { Dashboard } from '../../pages/dashboard/Dashboard';
import { AuthPage } from '../../pages/authPages/AuthPage';

import PrivateRoute from '../auth/PrivateRoute';

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path={routeMap.LOGIN} element={<AuthPage />} />
    <Route path={routeMap.SIGNUP} element={<AuthPage />} />

    {/* Protected Routes */}
    <Route path={routeMap.DASHBOARD} element={<PrivateRoute element={Dashboard} />} />
    <Route path="/*" element={<Navigate to={routeMap.DASHBOARD} />} />
  </Routes>
);

export default AppRoutes;