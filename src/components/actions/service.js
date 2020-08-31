import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';

import Option from './option';

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
            <Option header={ 'Add Service' } func={ service } />
        </Fragment>
    )
}

export default Actions;