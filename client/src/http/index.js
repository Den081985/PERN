const axios = require("axios");
//экземпляр для запросов неавторизованных пользователей
export const $host = axios.create({
  baseURL: "http://localhost:5000/",
});
