import axios from "./Customize-axios";

const getAllClazzBySubject = (subjectId) => {
    return axios.get(`/api/classes/subject/${subjectId}`)
}

const getAllClazzAPI = () => {
    return axios.get(`/api/classes`)
}

const createClazzAPI = (clazz) => {
    return axios.post(`/api/classes`, clazz)
}

const updateClazzAPI = (clazz, clazzId) => {
    return axios.put(`/api/classes/${clazzId}`, clazz)
}

const deleteClazzAPI = (clazzId) => {
    return axios.delete(`/api/classes/${clazzId}`)
}

const importExcelClazzAPI = (clazzes) => {
    return axios.post(`/api/classes/import`, clazzes)
}

const getInforDetailBySubjectAPI = (subjectId) => {
    return axios.get(`/api/classes/infor-detail/${subjectId}`)
}

const getClazzInStudyinByStudentAPI = () => {
    return axios.get(`/api/classes/studyin-student`);
}

export {
    getAllClazzBySubject,
    getAllClazzAPI,
    createClazzAPI,
    updateClazzAPI,
    deleteClazzAPI,
    importExcelClazzAPI,
    getInforDetailBySubjectAPI,
    getClazzInStudyinByStudentAPI
}