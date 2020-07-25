import React from 'react';
import '../../interface/css/actions.scss';

function Actions({ dispatch }) {

    // PURCHASE TOKENS PROMPT
    function purchase() {
        dispatch({
            type: 'show-prompt',
            payload: 'task'
        })
    }

    // TRANSFER TOKENS PROMPT
    function transfer() {
        dispatch({
            type: 'show-prompt',
            payload: 'user'
        })
    }

    // TRADE TOKENS PROMPT
    function trade() {
        dispatch({
            type: 'show-prompt',
            payload: 'user'
        })
    }
    
    return (
        <div id={ 'actions' }>
            <li id={ 'action' } onClick={ purchase }>Purchase</li>
            <li id={ 'action' } onClick={ transfer }>Transfer</li>
            <li id={ 'action' } onClick={ trade }>Trade</li>
        </div>
    )
}

export default Actions;