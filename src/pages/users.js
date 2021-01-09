import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../assets/context';
import { initialized } from '../funcs/contract/user';

import Info from '../components/shared/info';
import Actions from '../components/actions';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context)

    // LOCAL STATE
    const [status, set_status] = useState()

    // ON LOAD
    useEffect(() => {

        // FETCH & SET CONTRACT INIT STATUS
        initialized(state).then(response => {
            set_status(response)
        })

    // eslint-disable-next-line
    }, [])
    
    return (
        <Fragment>
            <Info
                header={ 'User Manager' }
                data={{
                    'Contract': state.contracts.managers.user._address,
                    'Initialized': status ? 'True' : 'False'
                }}
            />
            <Actions
                options={{
                    'create account': () => {
                        console.log('foo')
                    },
                    'view account': () => {
                        console.log('foo')
                    }
                }}
            />
        </Fragment>
    )
}