import axios from "axios";
import { ElMessage } from "element-plus";
import uri from "./neglectUri";

export const http = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://120.55.102.250:8000" : "",
    // baseURL: import.meta.env.MODE === "development" ? "http://127.0.0.1:8000" : "",
    timeout: 60000,
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json",
    }
});

http.interceptors.request.use(config => {
    if(!uri.has(config.url!)){
        config.data = JSON.stringify(config.data);
    }
    config.headers!.token = (window.sessionStorage.getItem("token") as string);
    return config;
});

http.interceptors.response.use(response => {
    return response.data;
}, err => {
    console.log(err);
    ElMessage.error(err.response.data.msg);
    return Promise.reject(err);
});
