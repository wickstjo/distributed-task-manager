import React, { useRef, useEffect, useContext, useReducer } from 'react';
import { Context } from '../assets/context';
import { values, reducer } from '../states/message.js';
import EventListener from 'react-event-listener';
import '../interface/css/chat.scss';
import { shorten, to_date } from '../funcs/chat';

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
            set_local({
                type: 'message',
                payload: {
                    user: shorten(response.sig, 4),
                    msg: state.utils.to_string(response.payload),
                    timestamp: to_date(response.timestamp),
                    type: 'message'
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

            // CHAT COMMANDS & FUNCTIONS
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
            <EventListener
                target={ 'window' }
                onKeyDown={ key_listener }
            />
            <input
                type={ 'text' }
                id={ 'input' }
                placeholder={ 'Type something cool here!' }
                value={ local.input }
                onChange={ event => set_local({
                    type: 'input',
                    payload: event.target.value
                })}
            />
        </div>
    )
}

// ADD NEW MESSAGE COLUMN
function Column({ data }) {
    switch(data.type) {

        // MESSAGE
        case 'message': { return (
            <div id={ 'message' }>
                <div id={ 'timestamp' }>{ data.timestamp }</div>
                <div id={ 'user' }>{ data.user }</div>
                <div id={ 'msg' }>{ data.msg }</div>
            </div>
        )}

        // ACTION
        case 'action': { return (
            <div id={ 'action' }>
                <div id={ 'timestamp' }>{ data.timestamp }</div>
                <div id={ 'msg' }>{ data.msg }</div>
            </div>
        )}

        // ACTION
        case 'error': { return (
            <div id={ 'error' }>
                <div id={ 'timestamp' }>{ data.timestamp }</div>
                <div id={ 'msg' }>{ data.msg }</div>
            </div>
        )}

        // FALLBACK
        default: { console.log('Column switch error!') }
    }
}

export default Home;