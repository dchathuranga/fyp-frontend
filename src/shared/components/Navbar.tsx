import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { logout, openLoginModal } from 'features/auth/slice';
import { fetchFavorites } from 'features/favorites/slice';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { user, isLoggedIn } = useAppSelector((state: RootState) => state.auth);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  const handleLogin = () => {
    dispatch(openLoginModal());
    handleClose();
  };

  const handleFavorites = () => {
    dispatch(fetchFavorites());
    navigate('/favorites');
    handleClose();
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          color={theme.palette.primary.light}
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          RecipeHub
        </Typography>

        {isMobile &&
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {isLoggedIn && (
                <MenuItem onClick={handleFavorites}>
                  <FavoriteIcon sx={{ mr: 1 }} /> Favorites
                </MenuItem>
              )}
              {isLoggedIn ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={handleLogin}>
                  Login
                </MenuItem>
              )}
            </Menu>
          </>
        }
        {!isMobile && 
          <>
            <Box sx={{ display: 'flex', gap: 2 }}>
            {isLoggedIn ? (
              <>
                <Button
                  color="inherit"
                  startIcon={<FavoriteIcon />}
                  onClick={handleFavorites}
                >
                  Favorites
                </Button>
                <Button
                  color="inherit"
                  startIcon={<AccountCircleIcon />}
                  onClick={handleMenu}
                >
                  {user?.email}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Box>
          </>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 