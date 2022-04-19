import { ReactElement, ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isAuthenticated: boolean;
  isActivated: boolean;
}

const RequireAuth: React.FC<Props> = ({ isAuthenticated, isActivated }) => {
  return isAuthenticated && isActivated ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
