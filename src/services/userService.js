import axios from "./Customize-axios";

const getMyInforAPI = () => {
    return axios.get('/api/users/myInfor')
}

const updateImageAPI = (id, formData) => {
    return axios.put(`/api/users/update-image/${id}`, formData)
}

export {
    getMyInforAPI,
    updateImageAPI
}