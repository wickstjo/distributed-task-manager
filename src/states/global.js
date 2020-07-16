// DEFUALT VALUES
const values = {
    web3: null,
    preload: false
}

// REDUCER
function reducer(state, action) {
    switch (action.type) {

        // ON THE INITIAL PAGE LOAD
        case 'init': { return {
            ...state,
            web3: action.payload,
            preload: true
        }}

        // FALLBACK
        default: {
            console.log('Context reducer type not found');
            return state;
        }
    }
}

export {
    values,
    reducer
}