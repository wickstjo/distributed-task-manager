import React from 'react';
import '../../interface/css/actions.scss';

function Actions({ dispatch }) {

    // CREATE TASK PROMPT
    function create_task() {
        dispatch({
            type: 'show-prompt',
            payload: 'task'
        })
    }

    // REGISTER USER PROMPT
    function register_user() {
        dispatch({
            type: 'show-prompt',
            payload: 'user'
        })
    }
    
    return (
        <div id={ 'actions' }>
            <li id={ 'action' } onClick={ create_task }>Create Task</li>
            <li id={ 'action' } onClick={ register_user } className={ 'user' }>Register User</li>
        </div>
    )
}

export default Actions;