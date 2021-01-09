import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../assets/context';
import { details, changes, balance } from '../funcs/contract/token';
import { separator } from '../funcs/format';
import { reducer } from '../states/local';

import Info from '../components/shared/info';
import Actions from '../components/actions';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context)

    // LOCAL STATE
    const [local, set_local] = useReducer(reducer, {
        status: '',
        symbol: '',
        price: 0,
        capacity: 0,
        available: 0,
        balance: 0
    })

    // ON LOAD
    useEffect(() => {

        // FETCH TOKEN PRICE
        details(state).then(response => {
            set_local({
                type: 'all',
                payload: {
                    status: response[0],
                    symbol: response[1],
                    price: response[2],
                    capacity: response[3],
                    available: response[3] - response[4],
                    balance: response[5]
                }
            })
        })

        // SUBSCRIBE TO CHANGES IN THE CONTRACT ON MOUNT
        const feed = changes(state).on('data', response => {

            // SET AVAILABILITY 
            set_local({
                type: 'partial',
                payload: {
                    available: response.returnValues.capacity - response.returnValues.sold
                }
            })

            // REFRESH PERSONAL BALANCE
            balance(state).then(amount => {
                set_local({
                    type: 'partial',
                    payload: {
                        balance: amount
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
                header={ 'Token Manager' }
                data={{
                    'Contract': state.contracts.managers.token._address,
                    'Initialized': local.status ? 'True' : 'False',
                    'Symbol': local.symbol,
                    'Price': separator(local.price) + ' WEI',
                    'Capacity': separator(local.capacity),
                    'Available': separator(local.available)
                }}
            />
            <Info
                header={ 'Your Balance' }
                data={{
                    'User': state.keys.public,
                    'Balance': separator(local.balance)
                }}
            />
            <Actions
                options={{
                    'purchase': () => {
                        console.log('foo')
                    }
                }}
            />
        </Fragment>
    )
}