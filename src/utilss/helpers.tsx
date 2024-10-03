// localStorageHelpers.js
export const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (e) {
        console.warn('Lưu state vào localStorage thất bại', e);
    }
};

export const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) return undefined; // Không có state nào trong localStorage
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn('Lấy state từ localStorage thất bại', e);
        return undefined;
    }
};
