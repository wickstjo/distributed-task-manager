import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';
import { update_middleware } from '../../funcs/contract/device';

function Actions({ state, dispatch }) {

    // TRIGGER UPDATE EVENT
    function trigger_update() {
        update_middleware(() => {

            // SUCCESS MESSAGE
            return 'middleware update triggered'

        }, state.trigger, state, dispatch)
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