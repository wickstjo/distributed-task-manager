import React, { useContext, useReducer, Fragment, useEffect } from 'react';
import { Context } from '../assets/context';
import { details, added, collection } from '../funcs/contract/oracle';
import reducer from '../states/local';

import Info from '../components/shared/info';
import List from '../components/shared/list';
import Actions from '../components/actions';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context)

    // LOCAL STATE
    const [local, set_local] = useReducer(reducer, {
        initialized: false,
        collection: []
    })
    
    // ON LOAD
    useEffect(() => {

        // FETCH & SET CONTRACT INIT STATUS
        details(state).then(response => {
            set_local({
                type: 'all',
                payload: {
                    initialized: response[0],
                    collection: response[1]
                }
            })
        })

        // SUBSCRIBE TO CHANGES IN THE CONTRACT ON MOUNT
        const feed = added(state).on('data', () => {

            // FETCH & SET USER DEVICE COLLECTION
            collection(state).then(response => {
                set_local({
                    type: 'partial',
                    payload: {
                        collection: response
                    }
                })
            })
        })

        // UNSUBSCRIBE ON UNMOUNT
        return () => { feed.unsubscribe(); }

    // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Info
                header={ 'Oracle Manager' }
                data={{
                    'Contract': state.contracts.managers.oracle._address,
                    'Initialized': local.initialized ? 'True' : 'False'
                }}
            />
            <List
                header={ 'Your Oracles' }
                data={ local.collection }
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