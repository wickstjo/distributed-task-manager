// DEFAULT VALUES
const values = {
    messages: [],
    input: ''
}
 
 // REDUCER
 function reducer(state, action) {
    switch (action.type) {

        // UPDATE INPUT
        case 'input': { return {
            ...state,
            input: action.payload
        }}

        // RESET INPUT
        case 'reset': { return {
            ...state,
            input: ''
        }} 
 
        // ADD MESSAGE
        case 'message': { return {
            ...state,
            messages: [
                ...state.messages,
                action.payload
            ]
        }}

        // CLEAR MESSAGES
        case 'clear': { return {
            ...state,
            messages: []
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