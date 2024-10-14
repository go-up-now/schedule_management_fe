import axios from "./Customize-axios";

const getAllStudents = () => {
    return axios.get("/api/students");
}

const cancelRegisteredClazz = (clazzId) => {
    return axios.delete(`/api/students/cancel/${clazzId}`);
}

const getStudentMyInforAPI = () => {
    return axios.get('/api/students/myInfor')
}

const createStudentAPI = (student) => {
    return axios.post('/api/students', student)
}

const updateStudentAPI = (id, student) => {
    return axios.put(`/api/students/${id}`, student)
}

export {
    getAllStudents,
    cancelRegisteredClazz,
    getStudentMyInforAPI,
    createStudentAPI,
    updateStudentAPI
}