import axios from "axios";

export default axios.create({
  baseURL: window.appConfig.serverAPI,
  headers: {
    "Content-type": "application/json",
  },
});
