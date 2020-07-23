import Web3 from 'web3';
import { gateways, whisper } from '../settings.json';
import { shorten, to_date } from './chat';

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
function create_feed(state, dispatch) {
    if (state.whisper.utils !== null) {

        // UNSUBSCRIBE FROM ANY EXISTING FEED
        if (state.whisper.feed !== null) {
           state.whisper.feed.unsubscribe()
        }

        // HEX TOPIC NAME
        const hexed_topic = state.whisper.utils.to_hex(state.whisper.topic.name)

        // CREATE A NEW ONE
        const temp = state.shh.subscribe('messages', {
           symKeyID: state.whisper.topic.id,
           topics: [hexed_topic]

        // ON MESSAGE, ADD IT
        }).on('data', response => {

           // PARSE MESSAGE PARAM & DERIVATE FIRST WORK
           const message = state.whisper.utils.to_string(response.payload)
           const first = message.split(' ')[0].toLowerCase();

           // SET MESSAGE TYPE BASED ON FIRST WORD
           dispatch({
                type: 'message',
                payload: {
                    user: shorten(response.sig, 4),
                    msg: message,
                    timestamp: to_date(response.timestamp),
                    type: first === '!request' ? 'request' : 'message'
                }
            })
        })

        // SET FEED IN STATE
        dispatch({
           type: 'feed',
           payload: temp
        })
    }
}

export {
    init,
    create_feed
}