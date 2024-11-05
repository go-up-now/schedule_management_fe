import axios from "./Customize-axios";

const getAllSubjectByYearAndSemester = () => {
    return axios.get(`/api/subjects/by-semester-year`)
}

const getAllRegisteredSubjectByYearAndSemester = () => {
    return axios.get(`/api/subjects/registered`)
}

const getAllSubjectAPI = () => {
    return axios.get('/api/subjects')
}

export {
    getAllSubjectByYearAndSemester,
    getAllRegisteredSubjectByYearAndSemester,
    getAllSubjectAPI
}