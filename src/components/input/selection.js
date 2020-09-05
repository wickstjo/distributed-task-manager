import React, { useState, useEffect } from 'react';

export default ({ data, current, fallback, dispatch }) => {

    // SELECT THIS ONE
    function select(hash) {
        dispatch({
            type: 'specific',
            payload: {
                name: 'selected',
                data: {
                    value: hash,
                    validation: true
                }
            }
        })
    }

    return (
        <div id={ 'selection' }>
            <Content
                data={ data }
                current={ current }
                fallback={ fallback }
                select={ select }
            />
        </div>
    )
}

function Content({ data, current, fallback, select }) {
    switch(data.length) {

        case 0: { return (
            <div id={ 'fallback' }>{ fallback }</div>
        )}

        default: { return (
            data.map((value, index) =>
                <Option
                    header={ value }
                    current={ current }
                    key={ index }
                    func={() => {
                        select(value)
                    }}
                />
            )
        )}
    }
}

function Option({ header, current, func }) {

    // LOCAL STATE
    const [local, set_local] = useState('')

    useEffect(() => {
        if (current === header) {
            set_local('selected')
        } else {
            set_local('')
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current])

    return (
        <div id={ 'option' } onClick={ func } className={ local }>{ header }</div>
    )
}