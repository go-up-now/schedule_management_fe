import axios from "./Customize-axios";

const getAllShifts = () => {
    return axios.get('/api/shifts')
}

export {
    getAllShifts
}