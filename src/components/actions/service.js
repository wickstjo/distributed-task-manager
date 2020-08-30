import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';

function Actions({ dispatch }) {

    // OPEN TAG PROMPT
    function service() {
        dispatch({
            type: 'show-prompt',
            payload: 'service'
        })
    }

    return (
        <Fragment>
            <li id={ 'action' } onClick={ service }>Add Service</li>
        </Fragment>
    )
}

export default Actions;