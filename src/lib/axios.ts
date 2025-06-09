import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000", // Ganti kalau URL backend beda
  withCredentials: true, // penting untuk Sanctum
});

export default instance;
