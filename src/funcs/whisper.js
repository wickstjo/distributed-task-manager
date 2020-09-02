import Web3 from 'web3';
import { gateways, whisper } from '../settings.json';
import { to_date } from './chat';
import { encode } from './process';

// CREATE WHISPER INSTANCE & SET BASE PARAMS
function init(state) {

    // ESTABLISH WEB3 CONNECTION
    const web3 = new Web3('ws://' + gateways.whisper.host + ':' + gateways.whisper.port);

    // GENERATE NEW KEYPAIR
    return web3.shh.newKeyPair().then(identification => {

        // RESOLVE WITH EVERYTHING
        return {
            shh: web3.shh,
            whisper: {
                ...state.whisper,
                topic: whisper.topic,
                id: identification,
                utils: {
                    to_string: web3.utils.hexToString,
                    to_hex: web3.utils.stringToHex
                }
            }
        }
    })
}

// UBSUBCRIBE FROM OLD & SUBSCRIBE TO NEW WHISPER FEED
function create_feed(callback, state, dispatch) {

    // CREATE & RETURN A NEW FEED
    const feed = state.shh.subscribe('messages', {
        symKeyID: state.whisper.topic.key,
        topics: [state.whisper.utils.to_hex(state.whisper.topic.name)]

    // ON MESSAGE, RUN CALLBACK FUNCTION
    }).on('data', response => {
        callback(response)
    })

    // SAVE IT IN STATE
    dispatch({
        type: 'feed',
        payload: feed
    })
}

// ENTER KEY LISTENER
function add_message(input, set_input, state, dispatch, event) {

    // PREVENT PAGE RELOAD FROM FORM
    event.preventDefault();

    // IF THE INPUT FIELD ISNT EMPTY
    if (input.trim() !== '') {

        // COMMAND INPUTS
        const keyword = input.trim().split(' ')[0].toLowerCase()
        // const value = input.trim().split(' ')[1]

        // LOCAL CHAT COMMANDS
        const commands = {

            // CLEAR MESSAGE
            '/clear': () => {
                dispatch({
                    type: 'clear'
                })
            }
        }

        // IF KEYWORD IS FOUND
        if (Object.keys(commands).includes(keyword)) {

            // RUN FUNC & RESET INPUT
            commands[keyword]()
            set_input('')

        // OTHERWISE, SEND MESSAGE PAYLOAD
        } else {
            state.shh.post({
                symKeyID: state.whisper.topic.key,
                sig: state.whisper.id,
                ttl: 10,
                topic: state.whisper.utils.to_hex(state.whisper.topic.name),
                payload: state.whisper.utils.to_hex(input),
                powTime: 3,
                powTarget: 0.5
            
            // EVERYTHING OK, RESET INPUT
            }).then(hash => {
                set_input('')
    
            // OTHERWISE, SHOW ERROR
            }).catch(error => {
                dispatch({
                    type: 'message',
                    payload: {
                        msg: 'Could not send message!',
                        timestamp: to_date(Date.now() / 1000),
                        type: 'error'
                    }
                })
            })
        }
    }
}

// SUBMIT DEVICE SERVICE QUERY
function query(response, state, dispatch) {

    // STRINGIFY & ENCODE THE RESPONSE MESSAGE
    const stringify = JSON.stringify(response);
    const encoded = encode(stringify);

    // SEND THE MESSAGE
    state.shh.post({
        symKeyID: state.whisper.topic.key,
        sig: state.whisper.id,
        ttl: 10,
        topic: state.whisper.utils.to_hex(state.whisper.topic.name),
        payload: state.whisper.utils.to_hex(encoded),
        powTime: 3,
        powTarget: 0.5
    
    // EVERYTHING OK...
    }).then(() => {

        // ACTIVATE QUERY
        dispatch({
            type: 'set-query',
            payload: encoded
        })

        // SHOW POSITIVE ALERT
        dispatch({
            type: 'alert',
            payload: {
                type: 'good',
                text: 'A query has been sent submitted'
            }
        })

    // OTHERWISE, SHOW ERROR
    }).catch(() => {
        dispatch({
            type: 'alert',
            payload: {
                type: 'bad',
                text: 'Could not submit query'
            }
        })
    })
}

export {
    init,
    create_feed,
    add_message,
    query
}