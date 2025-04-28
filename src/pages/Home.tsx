import styled from 'styled-components';
import { Box, Container, Typography } from '@mui/material';
import RecipePredictionForm from '../features/recipes/components/RecipePredictionForm';
import RecipeGrid from '../shared/components/RecipeGrid';

const HeroSection = styled(Box)`
  background: linear-gradient(135deg, #ff7043 30%, #ffa726 90%);
  color: white;
  padding: 6rem 0;
  margin-bottom: 4rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
`;

const GridWrapper = styled(Container)`
  background-color: #fff;
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`;

const Title = styled(Typography)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.2);
`;

const Subtitle = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 400;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const Home = () => {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <HeroSection>
        <Container maxWidth="md">
          <Title variant="h1">
            Discover Perfect Recipes
          </Title>
          <Subtitle>
            Find delicious recipes based on the ingredients you have
          </Subtitle>
          <RecipePredictionForm />
        </Container>
      </HeroSection>

      <GridWrapper maxWidth="lg">
        <RecipeGrid />
      </GridWrapper>
    </Box>
  );
};

export default Home;
