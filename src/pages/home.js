import React, { useRef, useState, useEffect, useContext } from 'react';
import { Context } from '../assets/context';
import EventListener from 'react-event-listener';
import '../interface/css/home.scss';

function Home() {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // LOCAL STATES
    const [input, set_input] = useState('')
    const [messages, add_message] = useState([])

    // REF TO LATEST MESSAGE
    const latest = useRef(null)

    // ENTER KEY LISTENER
    const key_listener = (event) => {
        if (event.key.toLowerCase() === 'enter' && input !== '') {
            
            // ADD MESSAGE
            add_message([
                ...messages,
                {
                    user: 'wickstjo',
                    msg: input
                }
            ])

            // RESET INPUT
            set_input('')
        }
    }

    // WHEN A MESSAGE IS ADDED, SCROLL DOWN
    useEffect(() => {
        latest.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        state.web3.shh.newKeyPair().then(result => {
            console.log(result)
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id={ 'container' }>
            <div id={ 'messages' }>
                <div id={ 'scroller' }>
                    { messages.map((data, index) =>
                        <Message
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
                onChange={ event => set_input(event.target.value) }
                value={ input }
            />
        </div>
    )
}

function Message({ data }) { return (
   <div id={ 'message' }>
      { data.user }: { data.msg }
   </div>
)}

export default Home;