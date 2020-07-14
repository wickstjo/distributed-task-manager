import React, { useRef, useState, useEffect } from 'react';
import EventListener from 'react-event-listener';
import '../interface/css/home.scss';

function Home() {

    // REF TO LATEST MESSAGE
    const latest = useRef(null)

    // LOCAL STATE
    const [local, set_local] = useState('')
    const [messages, add_message] = useState([
        {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       },
       {
           user: 'foo',
           msg: 'msg'
       }
    ])

    // ENTER KEY LISTENER
    const key_listener = (event) => {
        if (event.key.toLowerCase() === 'enter' && local !== '') {
            
            // ADD MESSAGE
            add_message([
                ...messages,
                {
                    user: 'wickstjo',
                    msg: local
                }
            ])

            // RESET INPUT
            set_local('')
        }
    }
    
    useEffect(() => {
        latest.current.scrollIntoView({ behavior: "smooth" })
    })

    useEffect(() => {
        latest.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])

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
                onChange={ event => set_local(event.target.value) }
                value={ local }
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