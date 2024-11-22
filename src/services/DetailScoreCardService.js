import axios from "./Customize-axios";

const getAllByStudyHistoryIdAPI = (studyHistoryId) => {
    return axios.get(`/api/detail-score-card/${studyHistoryId}`)
}

export {
    getAllByStudyHistoryIdAPI
}