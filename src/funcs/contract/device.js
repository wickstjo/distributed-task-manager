import { transaction, assemble } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.device.methods,
        events: state.contracts.managers.device.events,
        address: state.contracts.managers.device._address
    }
}

// FETCH USER DEVICE COLLECTION
function fetch(hash, state) {
    return refs(state).manager.fetch_device(hash).call();
}

// FETCH USER DEVICE COLLECTION
function collection(state) {
    return refs(state).manager.fetch_collection(state.keys.public).call();
}

// ADD DEVICE
function register(hash, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(hash),
        contract: address
    }, state)
}

// NEW DEVICE ADDED EVENT
function device_added(location, state) {
    const { events } = refs(state)
    return events.device_added({
        filter: {
            user: location
        }
    })
}

// FETCH DEVICE ASSIGNMENT BACKLOG
function details(hash, state) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    return manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return contract.methods.details().call().then(response => {
            return {
                contract: device,
                owner: response[0],
                backlog: response[1],
                completed: response[2],
                tags: response[3],
                active: response[4] ? 'True' : 'False',
                discoverable: response[5] ? 'True' : 'False'
            }
        })
    })
}

// FETCH DEVICE ASSIGNMENT BACKLOG
function changes(hash, dispatch, state) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    return manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return contract.events.changes().on('data', response => {
            dispatch({
                type: 'all',
                payload: {
                    contract: device,
                    owner: response.returnValues.owner,
                    backlog: response.returnValues.backlog,
                    completed: response.returnValues.completed,
                    tags: response.returnValues.tags,
                    active: response.returnValues.active ? 'True' : 'False',
                    discoverable: response.returnValues.discoverable ? 'True' : 'False'
                }
            })
        })
    })
}


export {
    fetch,
    collection,
    register,
    device_added,
    details,
    changes
}