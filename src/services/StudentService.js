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

const importExcelStudentAPI = (students) => {
    return axios.post('/api/students/import', students)
}

const updateStudentAPI = (id, student) => {
    return axios.put(`/api/students/${id}`, student)
}

const deleteStudentAPI = (id) => {
    return axios.delete(`/api/students/${id}`)
}

export {
    getAllStudents,
    cancelRegisteredClazz,
    getStudentMyInforAPI,
    createStudentAPI,
    updateStudentAPI,
    deleteStudentAPI,
    importExcelStudentAPI
}