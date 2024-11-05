import axios from "./Customize-axios";

const registerClazz = (clazzId) => {
    return axios.post(`/api/study-in/registration-clazz`, { clazzId: clazzId });
}

const cancelRegistrationClazz = (subjectId) => {
    return axios.delete(`/api/study-in/subject/${subjectId}`);
}

export {
    registerClazz,
    cancelRegistrationClazz,
}