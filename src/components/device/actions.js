import React from 'react';
import '../../interface/css/actions.scss';
import { update } from '../../funcs/contract/device';
import { sleep } from '../../funcs/misc';

function Actions({ hash, state, dispatch }) {

    // TRIGGER UPDATE EVENT
    function process() {
        
        // SHOW LOADING SCREEN
        dispatch({
            type: 'show-prompt',
            payload: 'loading'
        })

        // EXECUTE THE TRANSACTION
        update(hash, state).then(() => {
            
            // SLEEP FOR 2 SECONDS
            sleep(2000).then(() => {

                // FINALLY HIDE THE LOADING SCREEN
                dispatch({
                    type: 'hide-prompt'
                })
            })
        })
    }

    return (
        <div id={ 'actions' }>
            <li id={ 'action' } onClick={ process } className={ 'retire' }>
                Update Middleware
            </li>
        </div>
    )
}

export default Actions;