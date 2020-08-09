import React, { useState, useEffect } from 'react';

function Text({ placeholder, data, category, dispatch, limit }) {

    // LOCAL STATE
    const [style, set_style] = useState('error')

    // VALIDATE INPUT
    function validate(input) {

        // IF VALIDATION PASSES
        if (input.length >= limit.min && input.length <= limit.max) {
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

        // OTHERWISE
        } else {
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
            <input
                placeholder={ placeholder }
                type={ 'text' }
                value={ data[category].value }
                onChange={ event => validate(event.target.value) }
            />
            <div id={ 'validation-wrapper' }>
                <div className={ style } />
            </div>
        </div>
    )
}

export default Text;