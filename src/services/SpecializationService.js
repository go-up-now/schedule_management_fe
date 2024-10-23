import axios from "./Customize-axios";

const getAllSpecializationAPI = () => {
    return axios.get(`/api/specializations`)
}

export {
    getAllSpecializationAPI
}