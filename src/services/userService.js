import axios from "./Customize-axios";

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('/auth/login', { email: userEmail, password: userPassword })
}

const getMyInforAPI = () => {
    return axios.get('/api/students/myInfor')
}

export {
    handleLoginAPI,
    getMyInforAPI
}