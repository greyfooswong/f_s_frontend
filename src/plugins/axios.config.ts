import axios from "axios";
import qs from "qs";
import uri from "./neglectUri";

export const instance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://120.55.102.250:8000/api/v1" : "",
});

instance.interceptors.request.use(config => {
    if(!uri.has(config.url!)){
        config.data = qs.stringify(config.data);
    }
    return config;
});
