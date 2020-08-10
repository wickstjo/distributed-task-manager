import React from 'react';
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
        <div id={ 'actions' }>
            <li id={ 'action' } onClick={ device }>Register Device</li>
        </div>
    )
}

export default Actions;