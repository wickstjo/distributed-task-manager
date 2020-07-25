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
            <li id={ 'action' } onClick={ device } className={ 'revert' }>Restore Defaults</li>
            <li id={ 'action' } onClick={ whisper } className={ 'save' }>Save Changes</li>
        </div>
    )
}

export default Actions;