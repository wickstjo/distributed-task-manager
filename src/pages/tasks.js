import React, { useContext, useEffect, useReducer, Fragment } from 'react';
import { Context } from '../assets/context';
import { read } from '../funcs/blockchain';
import reducer from '../states/local';

import Info from '../components/shared/info';
import Actions from '../components/actions';

export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context)

    // LOCAL STATES
    const [local, set_local] = useReducer(reducer, {
        initialized: false,
        fee: 0
    })

    // ON LOAD
    useEffect(() => {
        const run = async() => {

            // FETCH DATA & SET IN STATE
            set_local({
                type: 'all',
                payload: {

                    // INIT VALUE
                    initialized: await read({
                        contract: 'task',
                        func: 'initialized'
                    }, state),

                    // TOKEN FEE FOR TASKS
                    fee: await read({
                        contract: 'task',
                        func: 'fee'
                    }, state)
                }
            })
        }

        // RUN THE ABOVE
        run()

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
                        dispatch({
                            type: 'show-prompt',
                            payload: 'import-task'
                        })
                    },
                    'inspect task': () => {
                        dispatch({
                            type: 'show-prompt',
                            payload: 'inspect-task'
                        })
                    }
                }}
            />
        </Fragment>
    )
}