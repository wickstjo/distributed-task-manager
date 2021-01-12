import React, { useContext, Fragment } from 'react';
import { Context } from '../../assets/context';
import { load_yaml, sleep } from '../../funcs/misc';
import { sha_hash } from '../../funcs/process';

export default () => {

    // GLOBAL STATE
    const { dispatch } = useContext(Context);

    // PARSE A YAML FILE
    async function parse(event) {
        event.persist();

        // IF THE INPUT ISNT EMPTY
        if (event.target.value !== null) {

            // ATTEMPT TO LOAD THE UPLOADED YAML FILE
            const result = await load_yaml(event)

            // SHOW LOADING SCREEN
            dispatch({
                type: 'show-prompt',
                payload: 'loading'
            })

            // SLEEP FOR TWO SECOND TO SMOOTHEN TRANSITION
            await sleep(2)
            
            // EVEYRTHING WENT FINE
            if (result.success) {
                dispatch({
                    type: 'toast-message',
                    payload: {
                        type: 'good',
                        msg: 'yaml file parsed'
                    }
                })

                // HASH THE PARSED YAML FILE (JSON)
                const hash = sha_hash(result.data)
                console.log(hash)

            // OTHERWISE..
            } else {
                dispatch({
                    type: 'toast-message',
                    payload: {
                        type: 'bad',
                        msg: 'the yaml file could not be parsed'
                    }
                })
            }
        }

        // HIDE PROMPT
        dispatch({ type: 'hide-prompt' })
    }
    
    return (
        <Fragment>
            <div id={ 'header' }>create a new oracle</div>
            <div id={ 'container' }>
                <input
                    id={ 'import' }
                    type={ 'file' }
                    onChange={ parse }
                />
                <div id={ 'import-label' }>Select or drop a YAML config</div>
            </div>
        </Fragment>
    )
}