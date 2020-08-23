import React, { Fragment } from 'react';
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

    // LOG A USER IN
    function login(state, dispatch) {

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
                fetch(state.keys.public, state).then(address => {

                    // VERIFY IT
                    dispatch({
                        type: 'verify',
                        payload: address
                    })

                    // REDIRECT TO USER PAGE
                    dispatch({
                        type: 'redirect',
                        payload: '/users/' + state.keys.public
                    })

                    // FINALLY HIDE THE LOADING SCREEN
                    dispatch({
                        type: 'hide-prompt'
                    })

                    return 
                })
            })
        })
    }

    // SWITCH BUTTONS BASED ON VERIFICATION STATUS
    switch(state.verified) {

        // SHOW TASK BUTTON
        case true: { return (
            <Fragment>
                <li id={ 'action' } onClick={ create_task }>Create Task</li>
            </Fragment>
        )}

        // SHOW REGISTER BUTTON
        case false: { return (
            <Fragment>
                <li id={ 'action' } onClick={() => login(state, dispatch) } className={ 'user' }>Register User</li>
            </Fragment>
        )}

        // FALLBACK
        default: { return null; }
    }
}

export default Actions;