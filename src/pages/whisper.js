import React, { useRef, useEffect, useContext, useState } from 'react';
import { Context } from '../assets/context';
import '../interface/css/whisper.scss';
import { to_date } from '../funcs/chat';
import Message from '../components/chat/message';

function Whisper() {

    // state STATE
    const { state, dispatch } = useContext(Context)

    // LOCAL STATES
    const [input, set_input] = useState('')

    // REF TO LATEST MESSAGE
    const latest = useRef(null)

    // ON LOAD
    useEffect(() => {

        // RESET PAGE HEADER
        dispatch({
            type: 'header',
            payload: 'Whisper'
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // WHEN A MESSAGE IS ADDED, SCROLL DOWN
    useEffect(() => {
        latest.current.scrollIntoView({
            behavior: 'smooth'
        })
    }, [state.whisper.messages])

    // ENTER KEY LISTENER
    function add_message(event) {

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
                    symKeyID: state.whisper.topic.id,
                    sig: state.whisper.id,
                    ttl: 10,
                    topic: state.utils.to_hex(state.whisper.topic.name),
                    payload: state.utils.to_hex(input),
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

    return (
        <div id={ 'whisper' }>
            <div id={ 'messages' }>
                <div id={ 'scroller' }>
                    { state.whisper.messages.map((data, index) =>
                        <Message
                            data={ data }
                            key={ index }
                        />
                    )}
                    <div ref={ latest } />
                </div>
            </div>
            <form id={ 'footer' } onSubmit={ event => add_message(event) }>
                <input
                    autoFocus
                    type={ 'text' }
                    placeholder={ 'Type something cool here!' }
                    value={ input }
                    id={ 'chat-input' }
                    onChange={ event => set_input(event.target.value) }
                />
                <input
                    type={ 'button' }
                    value={ 'Post' }
                    id={ 'chat-button' }
                    onClick={ event => add_message(event) }
                />
            </form>
        </div>
    )
}

export default Whisper;