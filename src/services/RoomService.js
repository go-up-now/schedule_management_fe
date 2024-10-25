import axios from "./Customize-axios";

const getAllRooms = () => {
    return axios.get('/api/rooms')
}

const getAllRoomsByAreaId = (areaId) => {
    return axios.get(`/api/rooms/${areaId}`)
}

export {
    getAllRooms,
    getAllRoomsByAreaId
}