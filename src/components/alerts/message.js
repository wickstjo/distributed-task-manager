import React, { useState, useEffect, useRef } from 'react';
import { sleep } from "../../funcs/misc";

function Message({ item }) {

    // LOCAL STATE
    const [local, set_local] = useState({})

    // THE SELECTOR
    const selector = useRef(null);

    // FADE IN AND OUT
    useEffect(() => {

        // GRADUALLY TURN ON OPACITY
        set_local({
            ...local,
            right: -selector.current.offsetWidth
        })

        // WAIT 0.3 SECONDS
        sleep(300).then(() => {

            // GRADUALLY TURN OFF OPACITY
            set_local({
                ...local,
                opacity: '1',
                right: 0
            })

            // WAIT 3 SECONDS
            sleep(3000).then(() => {

                // GRADUALLY TURN OFF OPACITY
                set_local({
                    ...local,
                    right: -selector.current.offsetWidth
                })

                // WAIT 0.3 SECONDS
                sleep(300).then(() => {

                    // DISABLE THE SELECTOR
                    set_local({
                        ...local,
                        display: 'none'
                    })
                })
            })
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id={ 'message' } className={ item.type } style={ local } ref={ selector }>
            <div>{ item.text }</div>
        </div>
    )
}

export default Message;