import axios from "./Customize-axios";

const getAllMajors = () => {
    return axios.get('/api/majors')
}

export {
    getAllMajors
}