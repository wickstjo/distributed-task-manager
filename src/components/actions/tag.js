import React from 'react';
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
        <div id={ 'actions' }>
            <li id={ 'action' } onClick={ tag }>Add Tag</li>
        </div>
    )
}

export default Actions;