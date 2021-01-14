import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import '../../interface/css/input.scss';
import { Context } from '../../assets/context';
import reducer from '../../states/input';

import Text from '../input/text';

export default () => {

    // GLOBAL STATE
    const { state, dispatch } = useContext(Context);

    // INPUT STATE
    const [input, set_input] = useReducer(reducer, {
        query: {
            value: '',
            status: false
        }
    })

    // WHEN A VALID ADDRESS IS INPUT & ENTER IS PRESSED
    useEffect(() => {
        if (state.prompt.visible && input.query.status && state.key_event.key === 'Enter') {

            // RESET INPUT FIELDS
            set_input({ type: 'reset' })

            // HIDE THE PROMPT WINDOW
            dispatch({ type: 'hide-prompt' })
        }

    // eslint-disable-next-line
    }, [state.key_event])
    
    return (
        <Fragment>
            <div id={ 'header' }>find available oracle</div>
            <div id={ 'container' }>
                <Text
                    data={ input.query }
                    placeholder={ 'Write your query' }
                    range={[ 3, 50 ]}
                    update={ set_input }
                    id={ 'query' }
                />
            </div>
        </Fragment>
    )
}