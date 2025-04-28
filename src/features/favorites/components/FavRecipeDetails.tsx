import { Box, Container, Typography } from '@mui/material';
import RecipeDetails from 'shared/components/RecipeDetails';
import { RootState } from 'store/store';
import { useAppSelector } from 'store/hooks';
import BackButton from 'shared/components/BackButton';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SelectedRecipeDetails = () => {
  const navigate = useNavigate();
  const recipeId = useAppSelector((state: RootState) => state.favorites.selectedRecipeId);
  const recipes = useAppSelector((state: RootState) => state.favorites.favorites);
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  useEffect(() => {
    if (!recipe) {
      navigate('/favorites');
    }
  }, [recipe, navigate]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <BackButton type="Favorites" />
        </Box>
        {!recipe && (
          <Typography variant="h5" color="error">
            Recipe not found
          </Typography>
        )}
        {recipe && <RecipeDetails recipe={recipe} />}
      </Box>
    </Container>
  );
}

export default SelectedRecipeDetails;
