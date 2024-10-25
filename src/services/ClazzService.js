import axios from "./Customize-axios";

const registerClazz = (clazzId, studentId) => {
    return axios.post(`/api/classes/${clazzId}/${studentId}`);
}

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

export {
    registerClazz,
    getAllClazzBySubject,
    getAllClazzAPI,
    createClazzAPI,
    updateClazzAPI,
    deleteClazzAPI,
    importExcelClazzAPI
}