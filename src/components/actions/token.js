import React, { Fragment } from 'react';

function Actions({ dispatch }) {

    // PURCHASE TOKENS PROMPT
    function purchase() {
        dispatch({
            type: 'show-prompt',
            payload: 'token'
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
        <Fragment>
            <li id={ 'action' } onClick={ purchase }>Purchase</li>
            <li id={ 'action' } onClick={ transfer }>Transfer</li>
            <li id={ 'action' } onClick={ trade }>Trade</li>
        </Fragment>
    )
}

export default Actions;