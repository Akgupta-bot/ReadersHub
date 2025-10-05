import axios from "axios";

const API = axios.create({
  baseURL: "https://readershub-backend-b55v.onrender.com/api", // ✅ wrapped in quotes + includes /api
});

// 🔐 Automatically attach JWT token (if available)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
