
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clazzInfo: null,
    subjectId: null
};

const clazzSlice = createSlice({
    name: 'clazz',
    initialState,
    reducers: {
        setClazz(state, action) {
            state.clazzInfo = action.payload.clazzInfo;
            state.subjectId = action.payload.subjectId;
        },
        removeClazz(state) {
            state.clazzInfo = null;
        },
    },
});

export const { setClazz, removeClazz } = clazzSlice.actions;
export default clazzSlice.reducer;
