import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';

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
            <li id={ 'action' } onClick={ device }>Register Device</li>
        </Fragment>
    )
}

export default Actions;