import axios from "axios";

const instance = axios.create({

  baseURL: "http://139.162.44.140:4001"
});

// const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`,
// }

var token = sessionStorage.getItem("token");
instance.defaults.headers.common.Authorization = `Bearer ${token}`;

export default instance;