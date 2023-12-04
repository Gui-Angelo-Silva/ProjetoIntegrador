import axios from "axios";

const api = axios.create({
    baseURL : "https://localhost:7225",
})

export default api