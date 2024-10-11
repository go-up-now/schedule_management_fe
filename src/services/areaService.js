import axios from "./Customize-axios";

const getAllAreas = () => {
    return axios.get('/api/areas')
}

export {
    getAllAreas
}