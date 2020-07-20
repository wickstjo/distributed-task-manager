import React, { useRef, useEffect, useContext, useReducer } from 'react';
import { Context } from '../assets/context';
import { values, reducer } from '../states/message.js';
import EventListener from 'react-event-listener';
import '../interface/css/chat.scss';
import { shorten, to_date } from '../funcs/chat';
import Column from '../components/column';

function Home() {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context)

    // LOCAL STATES
    const [local, set_local] = useReducer(reducer, values)

    // REF TO LATEST MESSAGE
    const latest = useRef(null)

    // WHEN A MESSAGE IS ADDED, SCROLL DOWN
    useEffect(() => {
        latest.current.scrollIntoView({
            behavior: 'smooth'
        })
    }, [local.messages])

    // CREATE MESSAGE FEED
    useEffect(() => {

        // UNSUBSCRIBE FROM OLD FEED
        if (local.feed !== null) { local.feed.unsubscribe() }

        // CREATE A NEW ONE
        const temp = state.shh.subscribe('messages', {
            symKeyID: state.keys.sym,
            topics: [state.utils.to_hex(state.topic)]

        // ON MESSAGE, ADD IT
        }).on('data', response => {

            // PARSE MESSAGE PARAM & DERIVATE FIRST WORK
            const message = state.utils.to_string(response.payload)
            const first = message.split(' ')[0].toLowerCase();

            // SET MESSAGE TYPE BASED ON FIRST WORD
            set_local({
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
        set_local({
            type: 'feed',
            payload: temp
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.topic])

    // ENTER KEY LISTENER
    const key_listener = event => {
        if (event.key.toLowerCase() === 'enter' && local.input !== '') {

            // COMMAND INPUTS
            const keyword = local.input.split(' ')[0].toLowerCase()
            const value = local.input.split(' ')[1]

            // LOCAL CHAT COMMANDS & FUNCTIONS
            const commands = {

                // CLEAR MESSAGE
                '/clear': () => {
                    set_local({
                        type: 'clear'
                    })
                },

                // CHANGE TOPIC
                '/topic': () => {

                    // IF LENGTH IS OK
                    if (value.length === 4) {
                        dispatch({
                            type: 'topic',
                            payload: value
                        })
                        set_local({
                            type: 'topic'
                        })
                    
                    // OTHERWISE, SHOW ERROR
                    } else {
                        set_local({
                            type: 'error',
                            payload: 'The topic must be of length 4!'
                        })
                    }
                }
            }

            // IF KEYWORD IS FOUND
            if (Object.keys(commands).includes(keyword)) {

                // RUN FUNC & RESET INPUT
                commands[keyword]()
                set_local({ type: 'reset' })

            // OTHERWISE, SEND MESSAGE PAYLOAD
            } else {
                state.shh.post({
                    symKeyID: state.keys.sym,
                    sig: state.keys.id,
                    ttl: 10,
                    topic: state.utils.to_hex(state.topic),
                    payload: state.utils.to_hex(local.input),
                    powTime: 3,
                    powTarget: 0.5
                
                // EVERYTHING OK, RESET INPUT
                }).then(hash => {
                    console.log('Message sent!')
                    set_local({ type: 'reset' })
        
                // OTHERWISE, SHOW ERROR
                }).catch(error => {
                    set_local({
                        type: 'error',
                        payload: 'Could not send message!'
                    })
                    console.log('Error: ', error)
                })
            }
        }
    }

    return (
        <div id={ 'container' }>
            <div id={ 'messages' }>
                <div id={ 'scroller' }>
                    { local.messages.map((data, index) =>
                        <Column
                            data={ data }
                            key={ index }
                        />
                    )}
                    <div ref={ latest } />
                </div>
            </div>
            <div id={ 'footer' }>
                <div id={ 'input' }>
                    <EventListener
                        target={ 'window' }
                        onKeyDown={ key_listener }
                    />
                    <input
                        autoFocus
                        type={ 'text' }
                        placeholder={ 'Type something cool here!' }
                        value={ local.input }
                        onChange={ event => set_local({
                            type: 'input',
                            payload: event.target.value
                        })}
                    />
                </div>
                <div id={ 'settings-button' } onClick={() => {
                    dispatch({
                        type: 'show-prompt',
                        payload: 'settings'
                    })
                }}>Settings</div>
            </div>
        </div>
    )
}

export default Home;