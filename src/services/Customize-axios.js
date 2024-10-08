import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:6969/schedule-manage',
  timeout: 10000,
  headers: {
    Accept: 'application/json'
  },
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const isLoginPage = window.location.pathname === "/dang-nhap";

  if (!isLoginPage && token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header
  }
  return config;
  // }

}, error => {
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data ? response.data : response.status;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  let res = {};
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    res.data = error.response.data;
    res.status = error.response.status;
    res.headers = error.response.headers;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser 
    // and an instance of http.ClientRequest in node.js
    console.log("error: ", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  return res;
});

export default instance