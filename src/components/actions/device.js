import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';
import { update_middleware } from '../../funcs/contract/device';
import { sleep } from '../../funcs/misc';

function Actions({ state, dispatch }) {

    // TRIGGER UPDATE EVENT
    function trigger_update() {
        
        // SHOW LOADING SCREEN
        dispatch({
            type: 'show-prompt',
            payload: 'loading'
        })

        // EXECUTE THE TRANSACTION
        update_middleware(state.trigger, state).then(() => {
            
            // SLEEP FOR 2 SECONDS
            sleep(2000).then(() => {

                // FINALLY HIDE THE LOADING SCREEN
                dispatch({
                    type: 'hide-prompt'
                })
            })
        })
    }

    // SHOW CONFIG PROMPT
    function trigger_config() {
        dispatch({
            type: 'show-prompt',
            payload: 'tag-config'
        })
    }

    // SHOW CONFIG PROMPT
    function trigger_status() {
        dispatch({
            type: 'show-prompt',
            payload: 'status'
        })
    }

    return (
        <Fragment>
            <li id={ 'action' } onClick={ trigger_status }>Toggle Status</li>
            <li id={ 'action' } onClick={ trigger_config }>Discovery Config</li>
            <li id={ 'action' } onClick={ trigger_update }>Update Middleware</li>
        </Fragment>
    )
}

export default Actions;