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
        console.log('foo')
    }
    
    return (
        <Fragment>
            <li id={ 'action' } onClick={ purchase }>Purchase</li>
            <li id={ 'action' } onClick={ transfer }>Transfer</li>
        </Fragment>
    )
}

export default Actions;