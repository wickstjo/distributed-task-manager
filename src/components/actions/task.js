import React, { Fragment } from 'react';
import '../../interface/css/actions.scss';
import { retire } from '../../funcs/contract/task';

import Option from './option';

function Actions({ state, dispatch }) {

    // RETIRE TASK
    function retire_task() {
        retire(() => {

            // REDIRECT TO TASKS PAGE
            dispatch({
                type: 'redirect',
                payload: '/tasks'
            })

            // ALERT WITH MESSAGE
            return 'the task was retired and unlisted'

        }, state.trigger, state, dispatch)
    }

    return (
        <Fragment>
            <Option header={ 'Retire Task' } func={ retire_task } />
        </Fragment>
    )
}

export default Actions;