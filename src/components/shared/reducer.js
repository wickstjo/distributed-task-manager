function reducer(state, { type, payload }) {
    switch (type) {

        // UPDATE INPUT
        case 'specific': { return {
            ...state,
            [payload.name]: payload.data
        }}

        // PARTIALLY OVERWRITE STATES
        case 'partial': { return {
            ...state,
            ...payload
        }}

        // OVERWRITE ENTIRE STATE
        case 'all': { return {
            ...payload
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