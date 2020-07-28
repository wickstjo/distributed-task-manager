import React from 'react';
import { Link } from 'react-router-dom';

function Message({ data }) {
    switch(data.type) {

        // MESSAGE
        case 'message': {
            
            // THE LAST WORD
            const message = data.msg.split(' ');
            const last = message.pop();

            switch (last.length) {

                // REQUEST ANSWER
                case 56: { return (
                    <div id={ 'message' }>
                        <div id={ 'timestamp' }>{ data.timestamp }</div>
                        <div id={ 'user' }>{ data.user }</div>
                        <div id={ 'msg' }>
                            { message.join(' ') } <Link to={ '/devices/' + last }>{ last }</Link>
                        </div>
                    </div>
                )}

                // NORMAL MESSAGE
                default: { return (
                    <div id={ 'message' }>
                        <div id={ 'timestamp' }>{ data.timestamp }</div>
                        <div id={ 'user' }>{ data.user }</div>
                        <div id={ 'msg' }>{ data.msg }</div>
                    </div>
                )}
            }
        }

        // ACTION
        case 'action': { return (
            <div id={ 'action' }>
                <div id={ 'timestamp' }>{ data.timestamp }</div>
                <div id={ 'msg' }>{ data.msg }</div>
            </div>
        )}

        // FIND REQUEST
        case 'request': { return (
            <div id={ 'request' }>
                <div id={ 'timestamp' }>{ data.timestamp }</div>
                <div id={ 'user' }>{ data.user }</div>
                <div id={ 'msg' }>{ data.msg }</div>
            </div>
        )}

        // ACTION
        case 'error': { return (
            <div id={ 'error' }>
                <div id={ 'timestamp' }>{ data.timestamp }</div>
                <div id={ 'msg' }>{ data.msg }</div>
            </div>
        )}

        // FALLBACK
        default: { console.log('Column switch error!') }
    }
}

export default Message;