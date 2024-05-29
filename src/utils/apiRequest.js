import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:9090/api/v1"
});

apiRequest.interceptors.request.use(
  config => {

    console.log(`Request URL: ${config.url}`);
    console.log(`Request Method: ${config.method}`);
    console.log(`Request Data: ${JSON.stringify(config.data)}`);
    
    const token = localStorage.getItem('access_token');
    console.log(token)
    if (token) {
      console.log('Setting Authorization header:', token); // Debug log
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export default apiRequest;