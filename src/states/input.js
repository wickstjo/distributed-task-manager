// REDUCER
function reducer(state, { type, payload }) {
    switch (type) {

        // UPDATE INPUT
        case 'update': { return {
            ...state,
            [payload.name]: payload.data
        }}

        // FALLBACK
        default: {
            console.log('Context reducer type not found');
            return state;
        }
    }
}

export {
    reducer
}