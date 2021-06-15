import fetch from 'isomorphic-fetch';

import { RegisterForm, LoginForm, AddLinkForm } from '@/types/forms';

export const API_HOST: string =
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

export const addLink = (accessToken: string, form: any) => {
  return fetch(`${API_HOST}/link`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const updateLink = (
  accessToken: string,
  form: AddLinkForm,
  hash: string
) => {
  return fetch(`${API_HOST}/link/${hash}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const deleteLink = (accessToken: string, hash: string) => {
  return fetch(`${API_HOST}/link/${hash}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
};

export const fetchLinks = (accessToken: string, page: number = 1) => {
  return fetch(`${API_HOST}/link?page=${page}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getTotalStats = (accessToken: string) => {
  return fetch(`${API_HOST}/link/stats`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getLinkData = (accessToken: string, hash: string) => {
  return fetch(`${API_HOST}/link/${hash}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
