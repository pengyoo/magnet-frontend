
import {axiosInstance} from "@refinedev/simple-rest"; 
import axios from "axios";


// const API_URL = "http://localhost:8081/api/v1";

const API_URL = "https://magnet-api.bytemind.me/api/v1"

axiosInstance.interceptors.request.use((request) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("auth");
    // Check if the header property exists
    if (request.headers) {
        // Set the Authorization header if it exists
        if (token) request.headers["Authorization"] = `Bearer ${token}`;
    } else {
        // Create the headers property if it does not exist
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});


export default axiosInstance;
export { API_URL };