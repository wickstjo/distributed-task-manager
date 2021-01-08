import React, { useContext, Fragment } from 'react';
import { Context } from '../assets/context';

import Info from '../components/shared/info';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context)
    
    return (
        <Fragment>
            <Info
                header={ 'Oracle Manager' }
                data={{
                    'Contract': state.contracts.managers.oracle._address
                }}
            />
        </Fragment>
    )
}