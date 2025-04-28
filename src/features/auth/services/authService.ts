import axios from 'axios';
import { LoginResponse, credentials } from '../types';

const API_BASE_URL = process.env['REACT_APP_API_BASE_URL'];

export const login = async (credentials: credentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (credentials: credentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/register`, credentials);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
};
