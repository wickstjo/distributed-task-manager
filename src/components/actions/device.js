import React from 'react';
import '../../interface/css/actions.scss';
import { sleep } from '../../funcs/misc';

function Actions({ hash, state, dispatch }) {

    // TRIGGER UPDATE EVENT
    function trigger_update() {
        
        // SHOW LOADING SCREEN
        dispatch({
            type: 'show-prompt',
            payload: 'loading'
        })

        // EXECUTE THE TRANSACTION
        /* update(hash, state).then(() => {
            
            // SLEEP FOR 2 SECONDS
            sleep(2000).then(() => {

                // FINALLY HIDE THE LOADING SCREEN
                dispatch({
                    type: 'hide-prompt'
                })
            })
        }) */
    }

    // TRIGGER UPDATE CONFIG
    function trigger_config() {
        console.log('foo')
    }

    return (
        <div id={ 'actions' }>
            <li id={ 'action' } onClick={ trigger_config }>Discovery Config</li>
            <li id={ 'action' } onClick={ trigger_update }>Update Middleware</li>
        </div>
    )
}

export default Actions;