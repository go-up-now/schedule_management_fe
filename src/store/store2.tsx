
// const initialState = { isOpen: false };

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'ISOPENMODAL':
//             return { ...state, isOpen: true };
//         default:
//             return state;
//     }
// };

// export default reducer;

const initialState = {
    value: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TRUE':
            return { ...state, value: true };
        default:
            return state;
    }
};

export default reducer;