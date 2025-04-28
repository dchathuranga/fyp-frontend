import styled from 'styled-components';
import {
  Box,
  TextField,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { RootState } from 'store/store';
import { predictRecipes, setIngredients, setMealType, setTotalTime } from '../slice';
import React, { useState } from 'react';

const FormWrapper = styled(Box)`
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-top: 2rem;
`;

const IngredientInputWrapper = styled(Box)`
  display: flex;
  gap: 1rem;
`;

const StyledChip = styled(Chip)`
  background-color: #ff7043 !important;
  color: white !important;
  font-weight: 500;
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #ff7043 30%, #ffa726 90%);
  color: white !important;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: bold;
  text-transform: none;
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(135deg, #ffa726 30%, #ff7043 90%);
  }
  &:disabled {
    background: #e0e0e0;
    color: #666;
  }
`;

const RecipePredictionForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, categories, filters } = useAppSelector((state: RootState) => state.recipes);
  const { ingredients, mealType, totalTime } = filters;

  const [ingredient, setIngredient] = useState('');

  
  const mealTypes = ['All', ...categories];
  const totalTimes: { label: string; value: number }[] = [
    { label: 'Any', value: 0 },
    { label: '15 mins', value: 15 },
    { label: '30 mins', value: 30 },
    { label: '1 hour', value: 60 },
    { label: '1 hour 30 mins', value: 90 },
    { label: '2 hours', value: 120 },
  ];

  const handleAddIngredient = () => {
    const newIngredient = ingredient.trim();
    if (newIngredient && !ingredients.includes(newIngredient)) {
      dispatch(setIngredients([...ingredients, newIngredient]));
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    dispatch(setIngredients(ingredients.filter((i) => i !== ingredientToRemove)));
  };

  const predictRecipesWithFilters = (currentMealType: string | null, currentTotalTime: number | null) => {
    const meal = currentMealType === 'All' ? null : currentMealType;
    const time = currentTotalTime === 0 ? null : currentTotalTime;
    if (ingredients.length > 0) {
      dispatch(predictRecipes({ ingredients, mealType: meal, totalTime: time }));
    }
  };

  const handleMealTypeChange = (value: string) => {
    dispatch(setMealType(value));
    predictRecipesWithFilters(value, totalTime);
  };

  const handleTotalTimeChange = (e: any) => {
    const newTime = Number(e.target.value);
    dispatch(setTotalTime(newTime));
    predictRecipesWithFilters(mealType, newTime);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    predictRecipesWithFilters(mealType, totalTime);
  };

  return (
    <FormWrapper component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <IngredientInputWrapper>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter an ingredient..."
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddIngredient();
              }
            }}
            sx={{ borderRadius: '12px' }}
            size="small"
          />
          <Button
            variant="contained"
            aria-label="add ingredient"
            onClick={handleAddIngredient}
            disabled={!ingredient.trim()}
            sx={{ minWidth: '56px', borderRadius: '12px' }}
          >
            <AddIcon />
          </Button>
        </IngredientInputWrapper>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {ingredients.map((ing) => (
            <StyledChip
              key={ing}
              label={ing}
              onDelete={() => handleRemoveIngredient(ing)}
              deleteIcon={<CancelIcon aria-label={`delete ingredient ${ing}`} />}
            />
          ))}
        </Box>

        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={{ xs: 2, sm: 2 }}
          sx={{ width: '100%' }}
        >
          <FormControl 
            sx={{ 
              minWidth: { xs: '100%', sm: 220 },
              '& .MuiInputBase-root': {
                height: { xs: 40, sm: 56 }
              }
            }}
            size="small"
          >
            <InputLabel id="meal-type-label">Meal Type</InputLabel>
            <Select
              labelId="meal-type-label"
              value={mealType || 'All'}
              label="Meal Type"
              onChange={(e) => handleMealTypeChange(e.target.value)}
            >
              {mealTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl 
            sx={{ 
              minWidth: { xs: '100%', sm: 220 },
              '& .MuiInputBase-root': {
                height: { xs: 40, sm: 56 }
              }
            }}
            size="small"
          >
            <InputLabel id="total-time-label">Total Time</InputLabel>
            <Select<number>
              labelId="total-time-label"
              value={totalTime || 0}
              label="Total Time"
              onChange={(e) => handleTotalTimeChange(e)}
            >
              {totalTimes.map((time) => (
                <MenuItem key={time.value} value={time.value}>
                  {time.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <SubmitButton
          type="submit"
          startIcon={isLoading ? <CircularProgress size={20} /> : <SearchIcon />}
          disabled={ingredients.length === 0 || isLoading}
        >
          {isLoading ? 'Finding recipes...' : 'Find Recipes'}
        </SubmitButton>
      </Stack>
    </FormWrapper>
  );
};

export default RecipePredictionForm;
