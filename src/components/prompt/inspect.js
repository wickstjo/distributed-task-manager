import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import '../../interface/css/input.scss';
import { Context } from '../../assets/context';
import reducer from '../../states/input';
import { replace } from '../../funcs/misc';

import Address from '../input/address';
import Hash from '../input/hash';

export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context);

    // INPUT STATE
    const [input, set_input] = useReducer(reducer, {
        address: {
            value: '',
            status: false
        }
    })

    // WHEN A VALID ADDRESS IS INPUT & ENTER IS PRESSED
    useEffect(() => {
        if (state.prompt.visible && input.address.status && state.key_event.key === 'Enter') {

            // REDIRECT TO THE PAGE
            dispatch({
                type: 'redirect',
                payload: replace(state.prompt.params.redirect, [input.address.value])
            })

            // HIDE THE PROMPT WINDOW
            dispatch({ type: 'hide-prompt' })
        }

    // eslint-disable-next-line
    }, [state.key_event])
    
    return (
        <Fragment>
            <div id={ 'header' }>Inspect { state.prompt.params.header }</div>
            <div id={ 'container' }>
                <Content
                    state={ state }
                    data={ input.address }
                    update={ set_input }
                    id={ 'address' }
                />
            </div>
        </Fragment>
    )
}

// CONTENT SWITCHER FOR INPUT FIELD
function Content({ state, data, update, id }) {
    switch(state.prompt.params.type) {

        // ADDRESS INPUT
        case 'address': { return (
            <Address
                data={ data }
                placeholder={ state.prompt.params.placeholder }
                update={ update }
                id={ id }
            />
        )}

        // SHA256 HASH INPUT
        case 'hash': { return (
            <Hash
                data={ data }
                placeholder={ state.prompt.params.placeholder }
                length={ 64 }
                update={ update }
                id={ id }
            />
        )}

        // FALLBACK
        default: { return null; }
    }
}