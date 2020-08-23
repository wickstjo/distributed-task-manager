import { to_date } from '../funcs/chat';
import { exists } from '../funcs/blockchain';

// DEFUALT VALUES
const values = {

    // PAGE HEADER
    header: 'tasks',

    // EVENT TRIGGER
    trigger: '',

    // WEB3 INSTANCE & SMART CONTRACTS
    web3: null,
    contracts: null,
    keys: {
        public: '',
        private: ''
    },

    // VERIFY USER REGISTRATION
    verified: false,

    // WHISPER PARAMS
    shh: null,
    whisper: {
        topic: {
            id: '',
            name: ''
        },
        id: '',
        feed: null,
        messages: [],
        utils: null
    },

    // PROMPT PARAMS
    prompt: {
        visible: true,
        type: 'loading'
    },

    // REDIRECT PARAMS
    redirect: {
        status: false,
        location: ''
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
                type: action.payload,
                source: action.source
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

        // SET PAGE HEADER
        case 'header': { return {
            ...state,
            header: action.payload
        }}

        // SET TRIGGER
        case 'trigger': { return {
            ...state,
            trigger: action.payload
        }}

        // SET WHISPER FEED
        case 'feed': { return {
            ...state,
            whisper: {
                ...state.whisper,
                feed: action.payload
            }
        }}

        // ADD WHISPER MESSAGE
        case 'message': { return {
            ...state,
            whisper: {
                ...state.whisper,
                messages: [
                    ...state.whisper.messages,
                    action.payload
                ]
            }
        }}

        // CLEAR ALL MESSAGES
        case 'clear': { return {
            ...state,
            whisper: {
                ...state.whisper,
                messages: [{
                    msg: 'The chat has been cleared!',
                    timestamp: to_date(Date.now() / 1000),
                    type: 'action'
                }]
            }
        }}

        // VERIFY USER REGISTRATION
        case 'verify': { return {
            ...state,
            verified: exists(action.payload)
        }}

        // REDIRECT TO PAGE
        case 'redirect': { return {
            ...state,
            redirect: {
                status: true,
                location: action.payload
            }
        }}

        // RESET REDIRECT LOGIC
        case 'reset-redirect': { return {
            ...state,
            redirect: {
                status: false,
                location: ''
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