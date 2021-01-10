import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../assets/context";
import '../interface/css/prompt.scss';

import Import from './prompt/import';
import Find from './prompt/find';

export default ({ set_wrapper }) => {
   
    // GLOBAL STATE
    const { state, dispatch } = useContext(Context);

    // LOCAL STYLE STATE -- DEFAULT TO INACTIVE
    const [local, set_local] = useState('inactive');

    // TOGGLE VISIBILITY
    useEffect(() => {

        // WRAPPER & PROMPT STATUSES
        const wrapper_status = state.prompt.visible ? 'inactive' : 'active'
        const prompt_status = state.prompt.visible ? 'active' : 'inactive'

        // CHANGE SELECTOR CLASSES
        set_local(prompt_status)
        set_wrapper(wrapper_status)

    // eslint-disable-next-line
    }, [state.prompt.visible])

    // CLOSE PROMPT WHEN ESC IS PRESSED
    useEffect(() => {
        if (state.key_event !== undefined && state.prompt.visible && state.key_event.key === 'Escape') {
            dispatch({ type: 'hide-prompt' })
        }

    // eslint-disable-next-line
    }, [state.key_event])

    return (
        <div id={ 'prompt' } className={ local }>
            <div id={ 'inner' }>
                <Content
                    type={ state.prompt.type }
                    param={ state.prompt.param }
                />
                <span id="close" onClick={() => { dispatch({ type: 'hide-prompt' }) }} />
            </div>
        </div>
    )
}

// PROMPT CONTENT
function Content({ type, param }) {
    switch(type) {

        // LOADING
        case 'loading': {
            return <div className="lds-dual-ring" />
        }

        // IMPORT PROMPT
        case 'import': {
            return <Import />
        }

        // FIND USER/ORACLE/TASK
        case 'find': {
            return <Find param={ param } />
        }

        // FALLBACK
        default: {
            return <div>PROMPT TYPE ERROR</div>
        }
    }
}