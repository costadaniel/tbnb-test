import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.5/api/product/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
