import axios from "./Customize-axios";

const getMyInforAPI = () => {
    return axios.get('/api/users/myInfor')
}

export {
    getMyInforAPI
}