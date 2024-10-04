import axios from "./Customize-axios";

const registerClazz = (clazzId, studentId) => {
    return axios.post(`/api/classes/${clazzId}/${studentId}`);
}

export { registerClazz }