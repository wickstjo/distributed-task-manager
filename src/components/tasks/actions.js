import React from 'react';
import '../../interface/css/actions.scss';
import { fetch, register } from '../../funcs/contract/user';
import { sleep } from '../../funcs/misc';

function Actions({ state, dispatch }) {

    // CREATE TASK PROMPT
    function create_task() {
        dispatch({
            type: 'show-prompt',
            payload: 'task'
        })
    }

    // REGISTER USER
    function register_user() {

        // SHOW LOADING SCREEN
        dispatch({
            type: 'show-prompt',
            payload: 'loading'
        })

        // REGISTER THE WALLET ADDRESS
        register(state).then(() => {
            
            // SLEEP FOR 2 SECONDS
            sleep(2000).then(() => {

                // FETCH THE USERS CONTRACT ADDRESS
                fetch(state.keys.public).then(address => {

                    // VERIFY IT
                    dispatch({
                        type: 'verify',
                        payload: address
                    })

                    // FINALLY HIDE THE LOADING SCREEN
                    dispatch({ type: 'hide-prompt' })
                })
            })
        })
    }
    
    return (
        <div id={ 'actions' }>
            {
                state.verified ? <li id={ 'action' } onClick={ create_task }>Create Task</li> : null
            }
            <li id={ 'action' } onClick={ register_user } className={ 'user' }>Register User</li>
        </div>
    )
}

export default Actions;