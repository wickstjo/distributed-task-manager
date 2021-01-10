import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Context } from '../assets/context';
import { initialized, create_user } from '../funcs/contract/user';
import { sleep } from '../funcs/misc';

import Info from '../components/shared/info';
import Actions from '../components/actions';

export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context)

    // LOCAL STATE
    const [local, set_local] = useState({
        initialized: false
    })

    // ON LOAD
    useEffect(() => {

        // FETCH & SET CONTRACT INIT STATUS
        initialized(state).then(response => {
            set_local({
                initialized: response
            })
        })

    // eslint-disable-next-line
    }, [])


    // CREATE ACCOUNT FUNCTION
    async function create_account() {

        // SHOW LOADING SCREEN
        dispatch({
            type: 'show-prompt',
            payload: {
                type: 'loading'
            }
        })

        // CREATE THE USER
        const result = await create_user(state)

        // SLEEP FOR A SECOND TO SMOOTHEN THE PROCESS
        await sleep(1)

        // HIDE LOADING SCREEN
        dispatch({ type: 'hide-prompt' })

        // EVERYTHING WENT FINE
        if (result.success) {

            // CREATE TOAST MESSAGE
            dispatch({
                type: 'toast-message',
                payload: {
                    type: 'good',
                    msg: 'account created'
                }
            })

        // OTHERWISE, SHOW ERROR
        } else {

            // CREATE TOAST MESSAGE
            dispatch({
                type: 'toast-message',
                payload: {
                    type: 'bad',
                    msg: result.reason
                }
            })
        }
    }
    
    return (
        <Fragment>
            <Info
                header={ 'User Manager' }
                data={{
                    'Contract': state.contracts.managers.user._address,
                    'Initialized': local.initialized ? 'True' : 'False'
                }}
            />
            <Actions
                options={{
                    'create account': create_account,
                    'view account': () => {
                        dispatch({
                            type: 'show-prompt',
                            payload: {
                                type: 'find',
                                param: 'user'
                            }
                        })
                    }
                }}
            />
        </Fragment>
    )
}