// DEFUALT VALUES
const values = {
    shh: null,
    keys: {},
    topic: 'eyya'
}

// REDUCER
function reducer(state, action) {
    switch (action.type) {

        // ON THE INITIAL PAGE LOAD
        case 'init': { return {
            ...state,
            ...action.payload
        }}

        // SET TOPIC
        case 'topic': { return {
            ...state,
            topic: action.payload
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