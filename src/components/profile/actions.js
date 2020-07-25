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

    // SET WHISPER NICKNAME
    function whisper() {
        dispatch({
            type: 'show-prompt',
            payload: 'user'
        })
    }
    
    return (
        <div id={ 'actions' }>
            <li id={ 'action' } onClick={ device }>Register Device</li>
            <li id={ 'action' } onClick={ whisper } className={ 'keys' }>Manage Keys</li>
        </div>
    )
}

export default Actions;