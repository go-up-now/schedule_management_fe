import axios from "./Customize-axios";

const paymentAPI = (payments) => {
    return axios.post('/api/payment/create-payment-link', payments)
}

export {
    paymentAPI
}