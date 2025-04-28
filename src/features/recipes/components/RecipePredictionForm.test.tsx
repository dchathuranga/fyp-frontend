import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RecipePredictionForm from './RecipePredictionForm';
import recipesReducer from '../slice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      recipes: recipesReducer,
    },
    preloadedState: {
      recipes: {
        recipes: [],
        selectedRecipeId: null,
        filters: {
          ingredients: [],
          mealType: 'All',
          totalTime: 0,
        },
        categories: ['Breakfast', 'Lunch', 'Dinner'],
        isLoading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

describe('RecipePredictionForm', () => {
  const renderComponent = (initialState = {}) => {
    const store = createMockStore(initialState);
    return render(
      <Provider store={store}>
        <RecipePredictionForm />
      </Provider>
    );
  };

  it('renders all form elements correctly', () => {
    renderComponent();
    
    expect(screen.getByPlaceholderText('Enter an ingredient...')).toBeInTheDocument();
    expect(screen.getByLabelText('Meal Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Total Time')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /find recipes/i })).toBeInTheDocument();
  });

  it('adds an ingredient when clicking the add button', () => {
    renderComponent();
    
    const input = screen.getByPlaceholderText('Enter an ingredient...');
    const addButton = screen.getByRole('button', { name: /add ingredient/i });

    fireEvent.change(input, { target: { value: 'chicken' } });
    fireEvent.click(addButton);

    expect(screen.getByText('chicken')).toBeInTheDocument();
  });

  it('adds an ingredient when pressing Enter', () => {
    renderComponent();
    
    const input = screen.getByPlaceholderText('Enter an ingredient...');
    
    fireEvent.change(input, { target: { value: 'chicken' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('chicken')).toBeInTheDocument();
  });

  it('removes an ingredient when clicking the delete button', () => {
    renderComponent({
      filters: {
        ingredients: ['chicken'],
        mealType: 'All',
        totalTime: 0,
      },
    });

    const deleteButton = screen.getByLabelText(/delete ingredient chicken/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText('chicken')).not.toBeInTheDocument();
  });

  it('changes meal type when selecting from dropdown', () => {
    renderComponent();
    
    const mealTypeSelect = screen.getByLabelText('Meal Type');
    
    fireEvent.mouseDown(mealTypeSelect);
    fireEvent.click(screen.getByText('Breakfast'));

    expect(mealTypeSelect).toHaveTextContent('Breakfast');
  });

  it('changes total time when selecting from dropdown', () => {
    renderComponent();
    
    const totalTimeSelect = screen.getByLabelText('Total Time');
    
    fireEvent.mouseDown(totalTimeSelect);
    fireEvent.click(screen.getByText('30 mins'));

    expect(totalTimeSelect).toHaveTextContent('30 mins');
  });

  it('disables submit button when no ingredients are added', () => {
    renderComponent();
    
    const submitButton = screen.getByRole('button', { name: /find recipes/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when ingredients are added', () => {
    renderComponent({
      filters: {
        ingredients: ['chicken'],
        mealType: 'All',
        totalTime: 0,
      },
    });
    
    const submitButton = screen.getByRole('button', { name: /find recipes/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('disables submit button while loading', () => {
    renderComponent({
      isLoading: true,
    });
    
    const submitButton = screen.getByRole('button', { name: /Finding recipes.../i });
    expect(submitButton).toBeDisabled();
  });

  it('displays error message when there is an error', () => {
    const errorMessage = 'Failed to fetch recipes';
    renderComponent({
      error: errorMessage,
    });
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('prevents adding duplicate ingredients', () => {
    renderComponent({
      filters: {
        ingredients: ['chicken'],
        mealType: 'All',
        totalTime: 0,
      },
    });
    
    const input = screen.getByPlaceholderText('Enter an ingredient...');
    const addButton = screen.getByRole('button', { name: /add ingredient/i });

    fireEvent.change(input, { target: { value: 'chicken' } });
    fireEvent.click(addButton);

    const chickenChips = screen.getAllByText('chicken');
    expect(chickenChips).toHaveLength(1);
  });

  it('trims whitespace from ingredients', () => {
    renderComponent();
    
    const input = screen.getByPlaceholderText('Enter an ingredient...');
    const addButton = screen.getByRole('button', { name: /add ingredient/i });

    fireEvent.change(input, { target: { value: '  chicken  ' } });
    fireEvent.click(addButton);

    expect(screen.getByText('chicken')).toBeInTheDocument();
  });
}); 