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

export {
    getAllStudents,
    cancelRegisteredClazz,
    getStudentMyInforAPI,
    createStudentAPI
}