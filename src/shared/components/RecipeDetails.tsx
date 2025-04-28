import styled from 'styled-components';
import {
  Container,
  Typography,
  Card,
  CardContent,
  ListItem,
  IconButton,
  Grid,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import 'react-multi-carousel/lib/styles.css';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { useAppDispatch } from '../../store/hooks';
import { toggleFavorite } from 'features/favorites/slice';
import { Recipe } from 'features/recipes/types';

const Section = styled(Card)`
  margin-bottom: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const Title = styled(Typography)`
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  background-color: #fff;
`;

const InstructionListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  background-color: #fff;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const NumberCircle = styled.div`
  min-width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #ff7043;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  margin-right: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);

  ${InstructionListItem} & {
    @media (max-width: 600px) {
      margin-right: 0;
      margin-bottom: 0.5rem;
    }
  }
`;

const IngredientBullet = styled(RestaurantIcon)`
  margin-right: 0.8rem;
  font-size: 1.3rem;
  color: #ff7043;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
`;

const CategoryText = styled(Typography)`
  border-radius: 12px;
  color: white;
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const NutritionText = styled(Typography)`
  background-color: #fff3e0;
  padding: 0.8rem;
  border-radius: 12px;
`;

const RecipeDetails = ({ recipe }: { recipe: Recipe }) => {
  const dispatch = useAppDispatch();
  const handleFavorite = () => {
    dispatch(toggleFavorite(recipe.id));
  };

  return (
    <Container maxWidth="md">
      <Section>
        <CardContent sx={{ p: '0 !important', lineHeight: 0 }}>
          <RecipeImage 
            src={recipe.img_src} 
            alt={recipe.recipe_name}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              objectFit: 'cover'
            }}
          />
        </CardContent>
      </Section>


      {/* Recipe Info */}
      <Section>
        <CardContent>
          <IconWrapper>
            <Typography variant="h4">{recipe.recipe_name}</Typography>
            <IconButton onClick={handleFavorite}>
              {recipe.isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </IconWrapper>
          <CategoryText color="textSecondary" sx={{ mb: 2 }}>{recipe.category}</CategoryText>
          <IconWrapper>
            <AccessTimeIcon sx={{ color: '#ff7043' }} />
            <Typography>Prep: {recipe.prep_time} | Cook: {recipe.cook_time} | Total: {recipe.total_time}</Typography>
          </IconWrapper>
          <IconWrapper>
            <DinnerDiningIcon sx={{ color: '#ff7043' }} />
            <Typography>Servings: {recipe.servings}</Typography>
          </IconWrapper>
        </CardContent>
      </Section>

      {/* Ingredients */}
      <Section>
        <CardContent>
          <Title variant="h6">Ingredients</Title>
          <Grid container spacing={2}>
            {recipe.ingredients.split(',').map((ingredient: string, index: number) => (
              <Grid item xs={12} sm={6} key={index}>
                <StyledListItem>
                  <IngredientBullet />
                  <Typography>{ingredient.trim()}</Typography>
                </StyledListItem>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Section>

      {/* Instructions */}
      <Section>
        <CardContent>
          <Title variant="h6">Instructions</Title>
          <Grid container spacing={2}>
            {recipe.directions.split('\n')
              .filter((instruction: string) => instruction && instruction.trim() !== '')
              .map((instruction: string, index: number) => (
                <Grid item xs={12} key={index}>
                  <InstructionListItem>
                    <NumberCircle>{index + 1}</NumberCircle>
                    <Typography>{instruction.trim()}</Typography>
                  </InstructionListItem>
                </Grid>
              ))}
          </Grid>
        </CardContent>
      </Section>

      {/* Nutrition Information */}
      <Section>
        <CardContent>
          <Title variant="h6">Nutrition Information</Title>
          <Grid container spacing={2}>
            {recipe.nutrition.split(',').map((nutrient: string, index: number) => (
              <Grid item xs={6} key={index}>
                <NutritionText>{nutrient.trim()}</NutritionText>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Section>
    </Container>
  );
};

export default RecipeDetails;
