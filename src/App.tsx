import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './shared/styles/theme';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import LoginModal from './features/auth/components/LoginModal';
import { RootState } from './store/store';
import { fetchUserInitData } from './features/recipes/slice';
import SelectedRecipeDetails from './features/recipes/components/SelectedRecipeDetails';
import FavRecipeDetails from 'features/favorites/components/FavRecipeDetails';
import PrivateRoute from 'features/auth/components/PrivateRoute';
import Navbar from 'shared/components/Navbar';

function AppContent() {
  const isLoginModalOpen = useAppSelector((state: RootState) => state.auth.isLoginModalOpen);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchUserInitData());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<SelectedRecipeDetails />} />
          <Route 
            path="/favorites" 
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/favorites/:id" 
            element={
              <PrivateRoute>
                <FavRecipeDetails />
              </PrivateRoute>
            } 
          />
        </Routes>
        <LoginModal 
          open={isLoginModalOpen}
        />
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App; 