import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.6/api/product/",
  timeout: 10000,
});
