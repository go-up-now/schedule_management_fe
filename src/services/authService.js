import axios from "./Customize-axios";

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('/auth/login', { email: userEmail, password: userPassword })
}

const refreshToken = (token) => {
    return axios.post('/auth/refresh', { token: token })
}

export {
    handleLoginAPI,
    refreshToken
}