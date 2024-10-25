import axios from "./Customize-axios";

const getAllSubjectByYearAndSemester = (semester, year, studentId) => {
    return axios.get(`/api/subjects/${semester}/${year}/${studentId}`)
}

const getAllRegisteredSubjectByYearAndSemester = (semester, year, studentId) => {
    return axios.get(`/api/subjects/registered/${semester}/${year}/${studentId}`)
}

const getAllSubjectAPI = () => {
    return axios.get('/api/subjects')
}

export {
    getAllSubjectByYearAndSemester,
    getAllRegisteredSubjectByYearAndSemester,
    getAllSubjectAPI
}