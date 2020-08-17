import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';

function Actions({ dispatch }) {

    // OPEN TAG PROMPT
    function tag() {
        dispatch({
            type: 'show-prompt',
            payload: 'tag'
        })
    }

    return (
        <Fragment>
            <li id={ 'action' } onClick={ tag }>Add Tag</li>
        </Fragment>
    )
}

export default Actions;