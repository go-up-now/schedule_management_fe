import axios from "./Customize-axios";

const getAllStudyHistoryByStudentAPI = () => {
    return axios.get(`/api/study-histories/student`);
}

export {
    getAllStudyHistoryByStudentAPI,
}