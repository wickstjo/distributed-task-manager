import { to_date } from '../funcs/chat';

// DEFAULT VALUES
const values = {
    messages: [],
    input: '',
    feed: null
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

        // CHANGE TOPIC
        case 'topic': { return {
            ...state,
            messages: [
                ...state.messages, {
                msg: 'The topic has been changed!',
                timestamp: to_date(Date.now() / 1000),
                type: 'action'
            }]
        }}

        // SHOW ERROR
        case 'error': { return {
            ...state,
            messages: [
                ...state.messages, {
                msg: action.payload,
                timestamp: to_date(Date.now() / 1000),
                type: 'error'
            }]
        }} 
    

        // CLEAR MESSAGES
        case 'clear': { return {
            ...state,
            messages: [{
                msg: 'The chat has been cleared!',
                timestamp: to_date(Date.now() / 1000),
                type: 'action'
            }]
        }}

        // SET MESSAGE FEED
        case 'feed': { return {
            ...state,
            feed: action.payload
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