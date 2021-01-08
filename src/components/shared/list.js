import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { filter_zeros } from '../../funcs/format';

export default ({ data, header, fallback, category }) => {

    // FILTER AWAY NULLIFIED VALUES
    const filtered = filter_zeros(data)

    switch(filtered.length) {

        // NO TASKS FOUND
        case 0: { return (
            <Fragment>
                <div id={ 'header' }>{ header } ({ filtered.length })</div>
                    <div id={ 'container' }>
                    <div id={ 'fallback' }>{ fallback }</div>
                </div>
            </Fragment>
        )}

        // OTHERWISE, LOOP OUT TASKS
        default: { return (
            <Fragment>
                <div id={ 'header' }>{ header } ({ filtered.length })</div>
                <div id={ 'container' }>
                    { filtered.map((value, index) =>
                        <Row
                            value={ value }
                            category={ category }
                            key={ index }
                        />
                    )}
                </div>
            </Fragment>
        )}
    }
}

// CONTAINER ROW
function Row({ value, category }) { return (
    <Link to={ category + '/' + value }>
        <div id={ 'row' }>{ value }</div>
    </Link>
)}