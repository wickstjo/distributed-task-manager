import React, { useState, useEffect } from 'react';

function Button({ value, fallback, execute, required }) {

    // LOCAL STATE
    const [local, set_local] = useState({
        value: '',
        style: ''
    })

    // WHEN A REQUIREMENT CHANGES
    useEffect(() => {
        if (required.includes(false)) {
            set_local({
                value: fallback,
                style: 'error'
            })
        } else {
            set_local({
                value: value,
                style: 'success'
            })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [required])

    // IF THE REQUIREMENTS ARE MET, EXECUTE THE FUNCTION
    function run() {
        if (!required.includes(false)) {
            execute()
        }
    }

    return (
        <div id={ 'submit' }>
            <input
                type={ 'submit' }
                value={ local.value }
                onClick={ run }
                id={ 'submit' }
                className={ local.style }
            />
        </div>
    )
}

export default Button;