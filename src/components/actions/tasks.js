import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';
import { fetch, register } from '../../funcs/contract/user';

function Actions({ state, dispatch }) {

    // CREATE TASK PROMPT
    function create_task() {
        dispatch({
            type: 'show-prompt',
            payload: 'task'
        })
    }

    // LOG A USER IN
    function login() {
        register(async() => {

            // FETCH THE USERS ADDRESS
            const address = await fetch(state.keys.public, state);

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

            // RETURN SUCCESS MESSAGE
            return 'your wallet has been registered'

        }, state, dispatch)
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
                <li id={ 'action' } onClick={() => login() } className={ 'user' }>Register User</li>
            </Fragment>
        )}

        // FALLBACK
        default: { return null; }
    }
}

export default Actions;