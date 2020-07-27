import React from 'react';
import Message from './message';

function Content({ data }) {
    switch(data.length) {

        // NO MESSAGES FOUND
        case 0: { return null }

        // OTHERWISE, LIST MESSAGES
        default: { return (
            <div id={ 'foo' }>
                { data.map((data, index) =>
                    <Message
                        data={ data }
                        key={ index }
                    />
                )}
            </div>
        )}
    }
}

export default Content;