
import axios from "axios";

// window.axios = axios
// axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.interceptors.request.use(function(config) {
    config.headers.common = {
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
        Accept: "application/json"
    };
    
    return config;
});
