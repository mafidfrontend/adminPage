import axios from "axios";

const api = axios.create({
  baseURL: "https://nt.softly.uz",
});

api.interceptors.response.use(null, (e) => {
  if(e.status === 401) {
    localStorage.removeItem("auth")
  }
})

export default api;
