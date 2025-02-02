import axios from "axios";

const API_URL = "https://3dcute.up.railway.app//app";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;
