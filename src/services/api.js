import axios from 'axios';
import {API_APP} from "../helpers/CONSTANTS";

// Создаем экземпляр Axios
const api = axios.create({
    baseURL: `${API_APP}`,
    // headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    // },
    // withCredentials: true,
});

// Перехватчик (Интерцептор)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;