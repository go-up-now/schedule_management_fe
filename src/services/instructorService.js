import axios from "./Customize-axios";

const getInstructorMyInforAPI = () => {
    return axios.get('/api/instructors/myInfor')
}

export {
    getInstructorMyInforAPI
}