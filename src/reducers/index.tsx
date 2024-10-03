import { combineReducers } from 'redux';
import userReducer from './userSlice.tsx'; // Giả sử bạn đã có userReducer

// Kết hợp tất cả các reducer của bạn
const rootReducer = combineReducers({
    user: userReducer, // Đặt tên reducer và import reducer tương ứng
    // Thêm các reducer khác ở đây nếu cần
});

export default rootReducer;
