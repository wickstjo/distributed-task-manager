import React, { Fragment } from 'react';
import { query } from '../../funcs/whisper';
import '../../interface/css/actions.scss';

import Option from './option';

function Service({ state, dispatch }) {

    // OPEN SERVICE PROMPT
    function trigger() {
        dispatch({
            type: 'show-prompt',
            payload: 'add-service'
        })
    }

    // FIND DEVICES WITH SERVICE
    function find() {
        query({
            type: 'request',
            services: [state.trigger],
            discovery: {}
        }, state, dispatch)
    }

    return (
        <Fragment>
            <Option header={ 'Add Service to Device' } func={ trigger } />
            <Option header={ 'Query Available Devices' } func={ find } />
        </Fragment>
    )
}

export default Service;