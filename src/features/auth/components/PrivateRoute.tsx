import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { openLoginModal } from '../slice';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
