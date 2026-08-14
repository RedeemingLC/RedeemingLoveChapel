import axios from "axios";

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // ✅ keep this
});

export default adminApi;
