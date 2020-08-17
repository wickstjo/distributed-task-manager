import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';
import { retire, complete } from '../../funcs/contract/task';
import { sleep } from '../../funcs/misc';

function Actions({ state, dispatch, source }) {

    // RETIRE TASK
    function retire_task() {
        
        // SHOW LOADING SCREEN
        dispatch({
            type: 'show-prompt',
            payload: 'loading'
        })

        // EXECUTE THE TRANSACTION
        retire(source, state).then(() => {
            
            // SLEEP FOR 2 SECONDS
            sleep(2000).then(() => {

                // FINALLY HIDE THE LOADING SCREEN
                dispatch({
                    type: 'hide-prompt'
                })
            })
        })
    }

    // FORCE COMPLETE TASK
    function force_complte() {
        
        // SHOW LOADING SCREEN
        dispatch({
            type: 'show-prompt',
            payload: 'loading'
        })

        // EXECUTE THE TRANSACTION
        complete(source, state).then(() => {
            
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
        <Fragment>
            <li id={ 'action' } onClick={ force_complte }>Force Complete</li>
            <li id={ 'action' } onClick={ retire_task } className={ 'bin' }>Retire Task</li>
        </Fragment>
    )
}

export default Actions;