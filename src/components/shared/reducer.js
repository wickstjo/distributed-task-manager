function reducer(state, { type, payload }) {
    switch (type) {

        // UPDATE INPUT
        case 'specific': { return {
            ...state,
            [payload.name]: payload.data
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