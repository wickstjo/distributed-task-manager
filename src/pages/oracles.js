import React, { useContext, useState, Fragment, useEffect } from 'react';
import { Context } from '../assets/context';
import { initialized } from '../funcs/contract/device';

import Info from '../components/shared/info';
import List from '../components/shared/list';
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
                header={ 'Oracle Manager' }
                data={{
                    'Contract': state.contracts.managers.oracle._address,
                    'Initialized': status ? 'True' : 'False'
                }}
            />
            <List
                header={ 'Your Oracles' }
                data={[]}
                fallback={ 'No oracles found.' }
            />
            <Actions
                options={{
                    'create oracle': () => {
                        console.log('foo')
                    },
                    'view oracle': () => {
                        console.log('foo')
                    }
                }}
            />
        </Fragment>
    )
}