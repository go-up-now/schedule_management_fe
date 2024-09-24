import axios from "./Customize-axios";

const FetchAll = () => {
    return axios.get("/students");
}

export { FetchAll }