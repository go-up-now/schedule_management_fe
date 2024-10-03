import axios from "./Customize-axios";

const getAllSubjectByYearAndSemester = () => {
    return axios.get('/api/subjects/spring/2024')
}

const getAllClazzBySubject = (subjectId) => {
    return axios.get(`/api/classes/subject/${subjectId}`)
}

// const getMyInforAPI = () => {
//     return axios.get('/api/students/myInfor')
// }

export {
    getAllSubjectByYearAndSemester,
    getAllClazzBySubject
}