import React from 'react';
import '../../interface/css/actions.scss';

function Actions({ state, dispatch }) {

    // CREATE TASK PROMPT
    function foo() {
        console.log('foo')
    }

    return (
        <div id={ 'actions' }>
            <li id={ 'action' } onClick={ foo } className={ 'retire' }>
                Retire Task
            </li>
        </div>
    )
}

export default Actions;