import axios from "axios";

const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL ||  'http://localhost:8080/api',
    withCredentials: true,
})


export default apiRequest;