import axios from "./Customize-axios";

const FetchAll = () => {
    return axios.get("/api/students");
}

const cancelRegisteredClazz = (clazzId) => {
    return axios.delete(`/api/students/cancel/${clazzId}`);
}

const getStudentMyInforAPI = () => {
    return axios.get('/api/students/myInfor')
}

export {
    FetchAll,
    cancelRegisteredClazz,
    getStudentMyInforAPI
}