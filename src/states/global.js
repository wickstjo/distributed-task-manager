// DEFUALT VALUES
const values = {
    shh: null,
    keys: {
        sym: '',
        id: ''
    },
    topic: 'eyya',
    prompt: {
        visible: true,
        type: 'loading'
    }
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

        // SHOW SPECIFIC PROMPT
        case 'show-prompt': { return {
            ...state,
            prompt: {
                visible: true,
                type: action.payload
            }
        }}

        // HIDE PROMPT
        case 'hide-prompt': { return {
            ...state,
            prompt: {
                ...state.prompt,
                visible: false
            }
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