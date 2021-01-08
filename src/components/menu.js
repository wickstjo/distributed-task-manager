import React, { useContext } from 'react';
import { Context } from "../assets/context";
import '../interface/css/menu.scss';

import MenuItem from './menu/item';

export default() => {

    // GLOBAL STATE
    const { state } = useContext(Context);
    
    return (
        <div id="menu">
            <div>
                <MenuItem
                    header={ 'Tasks' }
                    link={ '/' }
                />
                <MenuItem
                    header={ 'Oracles' }
                    link={ '/oracles' }
                />
                <MenuItem
                    header={ 'Users' }
                    link={ '/users' }
                />
                <MenuItem
                    header={ 'Tokens' }
                    link={ '/tokens' }
                />
                {
                    state.verified ? <MenuItem
                        header={ 'Profile' }
                        link={ '/users/' + state.keys.public }
                    /> : null
                }
                <MenuItem
                    header={ 'Whisper' }
                    link={ '/whisper' }
                />
            </div>
        </div>
    )
}