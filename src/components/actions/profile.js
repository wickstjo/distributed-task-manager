import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';

import Option from './option';

function Actions({ dispatch }) {

    // REGISTER DEVICE
    function device() {
        dispatch({
            type: 'show-prompt',
            payload: 'device'
        })
    }
    
    return (
        <Fragment>
            <Option header={ 'Register Device' } func={ device } />
        </Fragment>
    )
}

export default Actions;