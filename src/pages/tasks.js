import React, { useContext, useEffect, useReducer, Fragment } from 'react';
import { Context } from '../assets/context';
import { overview } from '../funcs/contract/task';
import reducer from '../states/local';

import Info from '../components/shared/info';
import Actions from '../components/actions';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context)

    // LOCAL STATES
    const [local, set_local] = useReducer(reducer, {
        initialized: false,
        fee: 0
    })

    // ON LOAD
    useEffect(() => {

        // FETCH & SET CONTRACT DETAILS
        overview(state).then(response => {
            set_local({
                type: 'all',
                payload: {
                    initialized: response[0],
                    fee: response[1]
                }
            })
        })

    // eslint-disable-next-line
    }, [])
    
    return (
        <Fragment>
            <Info
                header={ 'Task Manager' }
                data={{
                    'Contract': state.contracts.managers.task._address,
                    'Initialized': local.initialized ? 'True' : 'False',
                    'Token Fee': local.fee
                }}
            />
            <Actions
                options={{
                    'create task': () => {
                        console.log('foo')
                    },
                    'view task': () => {
                        console.log('foo')
                    },
                    'view task result': () => {
                        console.log('foo')
                    }
                }}
            />
        </Fragment>
    )
}