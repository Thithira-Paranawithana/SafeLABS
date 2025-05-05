import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5035',  
  headers: {
    'PPA_KEY': 'SvnqwrRcCGE_RSMS_KEY5xWUYcI3aLAi4=PPa', 
    'Content-Type': 'application/json',
    'Accept': '*/*', 
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
