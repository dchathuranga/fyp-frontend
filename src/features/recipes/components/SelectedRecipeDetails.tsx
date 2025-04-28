import { Box, Container, Typography } from '@mui/material';
import RecipeDetails from 'shared/components/RecipeDetails';
import { RootState } from 'store/store';
import { useAppSelector } from 'store/hooks';
import BackButton from 'shared/components/BackButton';

const SelectedRecipeDetails = () => {
  const recipeId = useAppSelector((state: RootState) => state.recipes.selectedRecipeId);
  const filteredRecipes = useAppSelector((state: RootState) => state.recipes.recipes);
  const recipe = filteredRecipes.find((recipe) => recipe.id === recipeId);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <BackButton type="Home" />
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
