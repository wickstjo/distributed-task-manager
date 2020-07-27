import { fetch, register } from './contract/user';
import { sleep } from './misc';

// LOG A USER IN
function login(state, dispatch) {

    // SHOW LOADING SCREEN
    dispatch({
        type: 'show-prompt',
        payload: 'loading'
    })

    // REGISTER THE WALLET ADDRESS
    register(state).then(() => {
        
        // SLEEP FOR 2 SECONDS
        sleep(2000).then(() => {

            // FETCH THE USERS CONTRACT ADDRESS
            fetch(state.keys.public).then(address => {

                // VERIFY IT
                dispatch({
                    type: 'verify',
                    payload: address
                })

                // FINALLY HIDE THE LOADING SCREEN
                dispatch({
                    type: 'hide-prompt'
                })
            })
        })
    })
}

export {
    login
}