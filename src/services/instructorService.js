import axios from "./Customize-axios";

const getInstructorMyInforAPI = () => {
    return axios.get('/api/instructors/myInfor')
}

const getAllInstructorAPI = () => {
    return axios.get('/api/instructors')
}

const getAllInstructorByAreaAPI = (areaId) => {
    return axios.get(`/api/instructors/${areaId}`)
}

export {
    getInstructorMyInforAPI,
    getAllInstructorAPI,
    getAllInstructorByAreaAPI
}