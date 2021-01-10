import React, { Fragment, useReducer } from 'react';
import reducer from '../../states/input';
import '../../interface/css/input.scss';

import Address from '../input/address';

// DECONSTRUCT: { param }

export default () => {

    // LOCAL STATES
    const [local, set_local] = useReducer(reducer, {
        header: '',
        address: {
            value: '',
            status: null
        }
    })
    
    return (
        <Fragment>
            <div id={ 'header' }>Find Something</div>
            <div id={ 'container' }>
                <Address
                    value={ local.address.value }
                    placeholder={ 'cool address' }
                    update={ set_local }
                    id={ 'address' }
                />
            </div>
        </Fragment>
    )
}