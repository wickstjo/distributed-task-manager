import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../assets/context';

export default ({ value, placeholder, update, id }) => {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // LOCAL STATE
    const [local, set_local] = useState({
        passes: false
    })

    // ON LOAD, VALIDATE
    useEffect(() => {
        validate(value);

        // eslint-disable-next-line
    }, [])

    // VALIDATE USER INPUT
    function validate(input) {

        // PERFORM CHECK
        const result = state.web3.utils.isAddress(input); 

        // SET RESULT LOCALLY
        set_local({ passes: result })

        // UPDATE PARENT STATE
        update({
            type: 'field',
            payload: {
                name: id,
                value: {
                    value: input,
                    status: result
                }
            }
        })
    }

    return (
        <div id={ 'field' }>
            <input
                type={ 'text' }
                className={ local.style ? 'good-input' : 'bad-input' }
                placeholder={ placeholder }
                value={ value }
                onChange={ event => { validate(event.target.value) }}
            />
        </div>
    )
}