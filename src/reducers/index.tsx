import { combineReducers } from 'redux';
import userReducer from './userSlice.tsx'; // Giả sử bạn đã có userReducer
import clazzReducer from './clazzSlice.tsx';
import modalReducer from './modalSlice.tsx';

// Kết hợp tất cả các reducer của bạn
const rootReducer = combineReducers({
    user: userReducer, // Đặt tên reducer và import reducer tương ứng
    clazz: clazzReducer,
    modal: modalReducer,
    // Thêm các reducer khác ở đây nếu cần
});

export default rootReducer;
