import React, { useContext, useReducer, useEffect, Fragment } from 'react';
import { Context } from '../assets/context';
import { read, event } from '../funcs/blockchain';
import { separator } from '../funcs/format';
import reducer from '../states/local';

import Info from '../components/shared/info';
import Actions from '../components/actions';

export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context)

    // LOCAL STATE
    const [local, set_local] = useReducer(reducer, {
        status: false,
        symbol: '',
        price: 0,
        capacity: 0,
        available: 0,
        balance: 0
    })

    // ON LOAD
    useEffect(() => {
        const run = async() => {

            // FETCH THE CAPACITY
            const capacity = await read({
                contract: 'token',
                func: 'capacity'
            }, state)

            // FETCH THE AVAILABILITY
            const sold = await read({
                contract: 'token',
                func: 'sold'
            }, state)

            // FETCH DATA & SET IN STATE
            set_local({
                type: 'all',
                payload: {

                    // INIT VALUE
                    status: await read({
                        contract: 'token',
                        func: 'initialized'
                    }, state),

                    // TOKEN SYMBOL
                    symbol: await read({
                        contract: 'token',
                        func: 'symbol'
                    }, state),

                    // TOKEN PRICE
                    price: await read({
                        contract: 'token',
                        func: 'price'
                    }, state),

                    // TOKEN CAPACITY & AVAILABILITY
                    capacity: capacity,
                    available: capacity - sold,

                    // USER TOKEN BALANCE
                    balance: await read({
                        contract: 'token',
                        func: 'balance',
                        args: [state.keys.public]
                    }, state)
                }
            })
        }

        // RUN THE ABOVE
        run()

        // SUBSCRIBE TO EVENT CHANGES
        const feed = event({
            contract: 'token',
            name: 'changes'
        }, state)
        
        // WHEN EVENT DATA IS INTERCEPTED
        feed.on('data', async(response) => {

            // REFRESH STATE 
            set_local({
                type: 'partial',
                payload: {

                    // REFRESH AVAILABILITY
                    available: response.returnValues.capacity - response.returnValues.sold,

                    // REFRESH USER BALANCE
                    balance: await read({
                        contract: 'token',
                        func: 'balance',
                        args: [state.keys.public]
                    }, state)
                }
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
                    'Account': state.keys.public,
                    'Balance': separator(local.balance)
                }}
            />
            <Actions
                options={{
                    'purchase tokens': () => {
                        dispatch({
                            type: 'show-prompt',
                            payload: 'purchase-tokens'
                        })
                    }
                }}
            />
        </Fragment>
    )
}