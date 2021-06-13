import { RegisterForm, LoginForm } from '@/types/forms';

const API_HOST: string =
  process.env.NODE_ENV === 'production'
    ? 'https://vshn.herokuapp.com'
    : 'http://localhost:5000';

export const verifyToken = (token: string) => {
  return fetch(`${API_HOST}/auth/token`, {
    method: 'HEAD',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logIn = (form: LoginForm) => {
  return fetch(`${API_HOST}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const register = (form: RegisterForm) => {
  return fetch(`${API_HOST}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};