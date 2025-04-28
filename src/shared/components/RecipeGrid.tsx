import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Alert,
  Rating,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Recipe } from '../../features/recipes/types';
import { toggleFavorite, setSelectedRecipeId as setSelectedFavId } from '../../features/favorites/slice';
import { setSelectedRecipeId } from '../../features/recipes/slice';

interface RecipeGridProps {
  isFavoritePage?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  isFavoritePage = false,
  isLoading = false,
  error = null
}) => {
  let recipes: Recipe[] = [];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filteredRecipes = useAppSelector((state: RootState) => state.recipes.recipes);
  const favRecipes = useAppSelector((state: RootState) => state.favorites.favorites);

  if (isFavoritePage) {
    recipes = favRecipes;
  } else {
    recipes = filteredRecipes;
  }

  const onClickCard = (id: number) => {
    if (isFavoritePage) {
      dispatch(setSelectedFavId(id));
      navigate(`/favorites/${id}`);
    } else {
      dispatch(setSelectedRecipeId(id));
      navigate(`/recipes/${id}`);
    }
  }

  const onclickfavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  }

  if (recipes?.length === 0 && !isLoading && !error) {
    return (
      <Alert severity="info" sx={{ mt: 4 }}>
        Enter some ingredients to find recipe suggestions
      </Alert>
    );
  }

  const favoriteIcon = (isFavorite: boolean) => {
    return isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />;
  };

  return (
    <Grid container spacing={4}>
      {recipes?.map((recipe) => (
        <Grid item xs={12} sm={6} md={3} key={recipe.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            }}
            onClick={() => onClickCard(recipe.id)}
          >
            <CardMedia
              component="img"
              height="200"
              image={recipe.img_src}
              alt={recipe.recipe_name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2">
                {recipe.recipe_name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                {recipe.category}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="body2">{recipe.total_time}</Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Rating 
                value={recipe.rating || 0} 
                readOnly 
                size="small"
                precision={0.5}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onclickfavorite(recipe.id);
                }}
              >
                {favoriteIcon(recipe.isFavorite)}
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeGrid; 