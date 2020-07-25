import React, { useRef, useEffect, useContext, useState } from 'react';
import { Context } from '../assets/context';
import '../interface/css/whisper.scss';
import Content from '../components/whisper/content';
import { add_message } from '../funcs/whisper';

function Whisper() {

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
                    <Content
                        data={ state.whisper.messages }
                        fallback={ 'The whisper feed has been created!' }
                    />
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

export default Whisper;