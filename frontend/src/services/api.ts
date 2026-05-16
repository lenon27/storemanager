import axios from 'axios';


const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://storemanager-production-367d.up.railway.app",

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15_000,
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ??
      error?.message ??
      'Erro desconhecido. Tente novamente.';

    return Promise.reject(new Error(message));
  }
);

export default api;
