import axios from "./Customize-axios";

const FetchAll = () => {
    return axios.get("/api/students");
}

export { FetchAll }