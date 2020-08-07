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

// FETCH DEVICE ASSIGNMENT BACKLOG
function backlog(hash, state) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    return manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return contract.methods.fetch_backlog().call();
    })
}

// ADD DEVICE
function register(hash, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(hash),
        contract: address
    }, state)
}

// FETCH DEVICE ASSIGNMENT BACKLOG
function update(hash, state) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    return manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return transaction({
            query: contract.methods.update(),
            contract: device
        }, state)
    })
}

// FETCH DEVICE OWNER
function owner(hash, state) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    return manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return contract.methods.owner().call();
    })
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
function assignment(hash, state) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    return manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return contract.events.assignment()
    })
}

export {
    fetch,
    collection,
    backlog,
    register,
    update,
    owner,
    device_added,
    assignment
}