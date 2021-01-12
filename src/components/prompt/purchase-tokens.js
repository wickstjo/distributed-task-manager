import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import '../../interface/css/input.scss';
import { Context } from '../../assets/context';
import reducer from '../../states/input';
import { sleep } from '../../funcs/misc';

import Number from '../input/number';

export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context);

    // INPUT STATE
    const [input, set_input] = useReducer(reducer, {
        amount: {
            value: '',
            status: false
        }
    })

    // WHEN A VALID ADDRESS IS INPUT & ENTER IS PRESSED
    useEffect(() => {
        if (state.prompt.visible && input.amount.status && state.key_event.key === 'Enter') {

            // SHOW LOADING SCREEN
            dispatch({
                type: 'show-prompt',
                payload: 'loading'
            })

            // SLEEP FOR 2 SECONDS TO SMOOTHEN TRANSITION
            sleep(2).then(() => {

                // HIDE THE PROMPT WINDOW
                dispatch({ type: 'hide-prompt' })
            })
        }

    // eslint-disable-next-line
    }, [state.key_event])
    
    return (
        <Fragment>
            <div id={ 'header' }>purchase tokens</div>
            <div id={ 'container' }>
                <Number
                    data={ input.amount }
                    placeholder={ "How many tokens would you like?" }
                    update={ set_input }
                    id={ 'amount' }
                    range={[1, 500]}
                />
            </div>
        </Fragment>
    )
}