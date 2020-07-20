import React from 'react';

function Column({ data }) {
    switch(data.type) {

        // MESSAGE
        case 'message': { return (
            <div id={ 'message' }>
                <div id={ 'timestamp' }>{ data.timestamp }</div>
                <div id={ 'user' }>{ data.user }</div>
                <div id={ 'msg' }>{ data.msg }</div>
            </div>
        )}

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

export default Column;