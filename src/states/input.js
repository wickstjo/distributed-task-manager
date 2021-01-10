function reducer(state, { type, payload }) {
    switch (type) {

        // UPDATE NAME
        case 'field': {
            return {
                ...state,
                [payload.name]: payload.value
            }
        }

        // FALLBACK
        default: {
            return state;
        }
    }
}

export default reducer;