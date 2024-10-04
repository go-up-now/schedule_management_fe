
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal(state, action) {
            state.isOpen = action.payload.isOpen;
        },
        resetModal(state) {
            state.isOpen = false;
        },
    },
});

export const { setModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
