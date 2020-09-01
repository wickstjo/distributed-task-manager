import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';

import Option from './option';

function Service({ dispatch }) {

    // OPEN SERVICE PROMPT
    function trigger() {
        dispatch({
            type: 'show-prompt',
            payload: 'add-service'
        })
    }

    // FIND DEVICES WITH SERVICE
    function find() {
        console.log('find devices')
    }

    return (
        <Fragment>
            <Option header={ 'Add Service to Device' } func={ trigger } />
            <Option header={ 'Query Available Devices' } func={ find } />
        </Fragment>
    )
}

export default Service;