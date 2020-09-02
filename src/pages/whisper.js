import React, { useRef, useEffect, useContext, useState } from 'react';
import { Context } from '../assets/context';
import '../interface/css/whisper.scss';
import { add_message } from '../funcs/whisper';

export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context)

    // LOCAL STATES
    const [input, set_input] = useState('')

    // REF TO LATEST MESSAGE
    const latest = useRef(null)

    // ON LOAD, SET SITE HEADER
    useEffect(() => {
        dispatch({
            type: 'header',
            payload: 'whisper'
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // WHEN A MESSAGE IS ADDED, SCROLL DOWN
    useEffect(() => {
        latest.current.scrollIntoView({
            behavior: 'smooth'
        })
    }, [state.whisper.messages])

    return (
        <div id={ 'whisper' }>
            <div id={ 'messages' }>
                <div id={ 'scroller' }>
                    <Content data={ state.whisper.messages } />
                    <div ref={ latest } />
                </div>
            </div>
            <form id={ 'footer' } onSubmit={ event => add_message(input, set_input, state, dispatch, event) }>
                <input
                    autoFocus
                    type={ 'text' }
                    placeholder={ 'What do you have to say?' }
                    value={ input }
                    id={ 'chat-input' }
                    onChange={ event => set_input(event.target.value) }
                />
                <input
                    type={ 'button' }
                    value={ 'Post' }
                    id={ 'chat-button' }
                    onClick={ event => add_message(input, set_input, state, dispatch, event) }
                />
            </form>
        </div>
    )
}

// CONTENT SWITCHER
function Content({ data }) {
    switch (data.length) {

        // NO MESSAGES
        case 0: {
            return null;
        }

        // RENDER MESSAGES
        default: { return (
            <div id={ 'foo' }>
            { data.map((data, index) =>
                <div id={ 'message' } key={ index }>
                    <div id={ 'timestamp' }>{ data.timestamp }</div>
                    <div id={ 'user' }>{ data.user }</div>
                    <div id={ 'msg' }>{ data.msg.length > 40 ? data.msg.substring(0, 37) + '...' : data.msg }</div>
                </div>
            )}
            </div>
        )}
    }
}