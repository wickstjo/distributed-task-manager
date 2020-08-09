import React, { useState, useEffect } from 'react';

function Json({ placeholder, data, category, dispatch }) {

    // LOCAL STATE
    const [style, set_style] = useState('error')

    // VALIDATE INPUT
    function validate(input) {

        // ATTEMPT TO PARSE THE INPUT
        try {
            JSON.parse(input)
            
            dispatch({
                type: 'update',
                payload: {
                    name: category,
                    data: {
                        value: input,
                        validation: true
                    }
                }
            })

        // IF IT FAILS
        } catch {
            dispatch({
                type: 'update',
                payload: {
                    name: category,
                    data: {
                        value: input,
                        validation: false
                    }
                }
            })
        }
    }

    // UPDATE VALIDATION BUTTON STYLE
    useEffect(() => {
        if (data[category].validation) {
            set_style('success')
        } else {
            set_style('error')
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data[category].validation])

    return (
        <div className={ 'input-wrapper' }>
            <textarea
                placeholder={ placeholder }
                value={ data[category].value }
                onChange={ event => validate(event.target.value) }
            />
            <div id={ 'validation-wrapper' }>
                <div className={ style } />
            </div>
        </div>
    )
}

export default Json;