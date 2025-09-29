import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Vite proxy заменит это на http://localhost:5001/api
});

// Перехватчик запросов для добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;