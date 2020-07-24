import React from 'react';
import Message from './message';

function Content({ data, fallback }) {
    switch(data.length) {

        // NO MESSAGES FOUND
        case 0: { return (
            <div id={ 'fallback' }>{ fallback }</div>
        )}

        // OTHERWISE, LIST MESSAGES
        default: { return (
            data.map((data, index) =>
                <Message
                    data={ data }
                    key={ index }
                />
            )
        )}
    }
}

export default Content;