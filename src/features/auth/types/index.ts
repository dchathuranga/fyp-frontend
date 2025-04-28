export interface User {
  id: number;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  message: string;
  user: User;
}

export interface credentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isLoginModalOpen: boolean;
  isLoggedIn: boolean;
  isGuest: boolean;
}
