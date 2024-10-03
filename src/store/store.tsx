// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index.tsx';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from '../utilss/helpers.tsx';

// Lấy state từ localStorage nếu có
const persistedState = loadStateFromLocalStorage();

const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState, // Khởi tạo store với state từ localStorage nếu có
});

// Lắng nghe mọi thay đổi và lưu state vào localStorage
store.subscribe(() => {
    saveStateToLocalStorage({
        user: store.getState().user, // Chỉ lưu những phần state cần thiết (ở đây là user)
    });
});

export default store;
