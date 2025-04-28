import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import RecipeGrid from '../shared/components/RecipeGrid';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import BackButton from '../shared/components/BackButton';

const Favorites = () => {
  const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn);
  const { error, loading, favorites } = useAppSelector((state: RootState) => state.favorites);

  if (!isLoggedIn) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Please Log In
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          You need to be logged in to view your favorite recipes.
        </Typography>
        <BackButton type="Home" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <BackButton type="Home" />
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress />
          <Typography variant="body1" color="text.secondary">
            Loading your favorite recipes...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          No Favorite Recipes Yet
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Start exploring recipes and save your favorites to see them here!
        </Typography>
        <BackButton type="Home" />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton type="Home" />
      <Typography variant="h4" gutterBottom>
        Your Favorite Recipes
      </Typography>
      <RecipeGrid isFavoritePage={true} />
    </Container>
  );
};

export default Favorites; 