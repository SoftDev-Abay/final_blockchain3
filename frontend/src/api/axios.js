import axios from "axios";
// import { eventEmitter } from "../services/eventEmitter";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       eventEmitter.emit("logout");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
