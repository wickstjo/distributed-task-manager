import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Context } from '../assets/context';
import { fee as get_fee } from '../funcs/contract/task';

import Info from '../components/shared/info';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context)

    // LOCAL STATES
    const [fee, set_fee] = useState('')

    // ON LOAD
    useEffect(() => {

        // FETCH & SET TASK FEE
        get_fee(state).then(amount => {
            set_fee(amount)
        })

    // eslint-disable-next-line
    }, [])
    
    return (
        <Fragment>
            <Info
                header={ 'Task Manager' }
                data={{
                    'Contract': state.contracts.managers.task._address,
                    'Token Fee': fee
                }}
            />
        </Fragment>
    )
}