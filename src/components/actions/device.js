import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';
import { update_middleware } from '../../funcs/contract/device';

import Option from './option';

export default ({ state, dispatch }) => {

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

    // SHOW SERVICES PROMPT
    function trigger_services() {
        dispatch({
            type: 'show-prompt',
            payload: 'remove-service'
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
            <Option header={ 'Toggle Status' } func={ trigger_status } />
            <Option header={ 'Discovery' } func={ trigger_config } />
            <Option header={ 'Remove Service' } func={ trigger_services } />
            <Option header={ 'Update Middleware' } func={ trigger_update } />
        </Fragment>
    )
}