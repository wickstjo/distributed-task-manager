import React, { Fragment } from 'react';
import Option from './option';

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
            <Option header={ 'Purchase' } func={ purchase } />
            <Option header={ 'Transfer' } func={ transfer } />
        </Fragment>
    )
}

export default Actions;