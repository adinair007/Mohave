import axios from "axios";

const instance = axios.create({
  baseURL: "https://mojave-store.herokuapp.com",
});

export default instance;
