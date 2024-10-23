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

export {
    registerClazz,
    getAllClazzBySubject,
    getAllClazzAPI
}