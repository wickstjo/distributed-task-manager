import React from 'react';
import '../../interface/css/actions.scss';
import { login } from '../../funcs/tasks';

function Actions({ state, dispatch }) {

    // CREATE TASK PROMPT
    function create_task() {
        dispatch({
            type: 'show-prompt',
            payload: 'task'
        })
    }

    // SWITCH BUTTONS BASED ON VERIFICATION STATUS
    switch(state.verified) {

        // SHOW TASK BUTTON
        case true: { return (
            <div id={ 'actions' }>
                <li id={ 'action' } onClick={ create_task }>Create Task</li>
            </div>
        )}

        // SHOW REGISTER BUTTON
        case false: { return (
            <div id={ 'actions' }>
                <li id={ 'action' } onClick={() => login(state, dispatch) } className={ 'user' }>Register User</li>
            </div>
        )}

        // FALLBACK
        default: { return null; }
    }
}

export default Actions;