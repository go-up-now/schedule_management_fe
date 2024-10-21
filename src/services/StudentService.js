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

const createStudentAPI = (formData) => {
    return axios.post('/api/students', formData)
}

const importExcelStudentAPI = (students) => {
    return axios.post('/api/students/import', students)
}

const updateStudentAPI = (id, formData) => {
    return axios.put(`/api/students/${id}`, formData)
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