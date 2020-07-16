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

    // WHEN A MESSAGE IS ADDED, SCROLL DOWN
    useEffect(() => {
        latest.current.scrollIntoView({
            behavior: 'smooth'
        })
    }, [messages])

    // CREATE MESSAGE FEED
    useEffect(() => {
        state.shh.subscribe('messages', {
            symKeyID: state.keys.sym,
            topics: [state.utils.to_hex(state.topic)]
        }).on('data', response => {

            console.log(response)

            // ADD MESSAGE
            add_message([
                ...messages,
                {
                    user: 'wickstjo',
                    msg: state.utils.to_string(response.payload)
                }
            ])
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ENTER KEY LISTENER
    const key_listener = (event) => {
        if (event.key.toLowerCase() === 'enter' && input !== '') {
            state.shh.post({
                symKeyID: state.keys.sym,
                sig: state.keys.id,
                ttl: 10,
                topic: state.utils.to_hex(state.topic),
                payload: state.utils.to_hex(input),
                powTime: 3,
                powTarget: 0.5
            
            // EVERYTHING OK, RESET INPUT
            }).then(hash => {
                console.log('Message sent!', hash)
                set_input('')
    
            // OTHERWISE, SHOW ERROR
            }).catch(error => {
                console.log('Error: ', error)
            })
        }
    }

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