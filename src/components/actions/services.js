import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';

import Option from './option';

function Services({ dispatch }) {

    // OPEN TAG PROMPT
    function service() {
        dispatch({
            type: 'show-prompt',
            payload: 'create-service'
        })
    }

    return (
        <Fragment>
            <Option header={ 'Add Service' } func={ service } />
        </Fragment>
    )
}

export default Services;