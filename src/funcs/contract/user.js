import { transaction, assemble } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.user.methods,
        address: state.contracts.managers.user._address
    }
}

// FETCH USER SMART CONTRACT
function fetch(wallet, state) {
    const { manager } = refs(state);
    return manager.fetch(wallet).call();
}

// FETCH DEVICE ASSIGNMENT BACKLOG
function details(wallet, state) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    return manager.fetch(wallet).call().then(location => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: location,
            contract: 'user'
        }, state);

        return contract.methods.details().call().then(response => {
            return {
                contract: location,
                devices: response[0],
                reputation: response[1]
            }
        })
    })
}

// FETCH DEVICE ASSIGNMENT BACKLOG
function changes(wallet, dispatch, state) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    return manager.fetch(wallet).call().then(location => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: location,
            contract: 'user'
        }, state);

        // WHEN AN EVENT IS DETECTED
        return contract.events.changes().on('data', response => {
            dispatch({
                type: 'partial',
                payload: {
                    results: response.results,
                    reputation: response.reputation
                }
            })
        })
    })
}

// ADD USER
function register(state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(),
        contract: address
    }, state)
}

export {
    fetch,
    details,
    changes,
    register
}