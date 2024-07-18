import axios from 'axios';

export const API_URL = `http://localhost:5000/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },async (error) => {
    const originalRequest = error.config;
    // Если вдруг access token протух, то пытаемся его обновить по refresh token
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true;// Чтобы не попасть в цикл, говорим что запрос уже был на попытку обновить токен
        const response = await axios.get(`${API_URL}/user/refresh`,
          {
            withCredentials: true// Чтобы отправлять автоматически куки с запросом
          });
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);// Повторяем опять тот же самый запрос
      } catch (e) {
        console.log(e);
      }
    }

    if (error.response.status === 400) {
      const message = error.response.data.message ?? 'Не валидные данные';
      throw new Error(message);
    }
  }
);

export default $api;