import axios from "./Customize-axios";

const getAllEducationProgramAPI = () => {
    return axios.get('/api/education-programs')
}

export {
    getAllEducationProgramAPI
}