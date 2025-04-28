import authReducer, { loginUser, openLoginModal, closeLoginModal, setIsGuest, logout, initialState } from '../features/auth/slice';
import { UnknownAction } from '@reduxjs/toolkit';

const mockUser = { id: 1, email: 'test@example.com' };
const mockResponse = {
  access_token: 'mock-token',
  message: 'Login successful',
  user: mockUser
};

describe('authSlice reducer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as UnknownAction)).toEqual(initialState);
  });

  it('should handle loginUser pending', () => {
    const action = { type: loginUser.pending.type };
    const state = authReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockResponse };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
    expect(state.isGuest).toBe(false);
    expect(state.isLoginModalOpen).toBe(false);
    expect(state.error).toBeNull();
    expect(localStorage.getItem('access_token')).toBe(mockResponse.access_token);
  });

  it('should handle loginUser rejected', () => {
    const errorMessage = 'Invalid credentials';
    const action = { type: loginUser.rejected.type, payload: errorMessage };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.isLoggedIn).toBe(false);
    expect(localStorage.getItem('access_token')).toBeNull();
  });

  it('should handle openLoginModal', () => {
    const state = authReducer(initialState, openLoginModal());
    expect(state.isLoginModalOpen).toBe(true);
  });

  it('should handle closeLoginModal', () => {
    const state = authReducer(initialState, closeLoginModal());
    expect(state.isLoginModalOpen).toBe(false);
  });

  it('should handle setIsGuest', () => {
    const state = authReducer(initialState, setIsGuest(true));
    expect(state.isGuest).toBe(true);
  });

  it('should handle logout', () => {
    const loggedInState = authReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mockResponse
    });
    expect(localStorage.getItem('access_token')).toBe(mockResponse.access_token);

    const state = authReducer(loggedInState, logout());
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
    expect(state.isGuest).toBe(false);
    expect(state.error).toBeNull();
    expect(localStorage.getItem('access_token')).toBeNull();
  });

  it('should handle multiple state transitions correctly', () => {
    // login pending
    let state = authReducer(initialState, { type: loginUser.pending.type });
    expect(state.loading).toBe(true);

    // login fulfilled
    state = authReducer(state, {
      type: loginUser.fulfilled.type,
      payload: mockResponse
    });
    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(true);
    expect(localStorage.getItem('access_token')).toBe(mockResponse.access_token);

    // logout
    state = authReducer(state, logout());
    expect(state.isLoggedIn).toBe(false);
    expect(state.user).toBeNull();
    expect(localStorage.getItem('access_token')).toBeNull();
  });
}); 