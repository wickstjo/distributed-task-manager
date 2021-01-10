// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.oracle.methods,
        events: state.contracts.managers.oracle.events,
        address: state.contracts.managers.oracle._address
    }
}

// FETCH INIT STATUS & USER DEVICE COLLECTION
async function details(state) {
    return [
        await refs(state).manager.initialized().call(),
        await collection(state)
    ]
}

// FETCH USER DEVICE COLLECTION
function fetch(hash, state) {
    return refs(state).manager.fetch_device(hash).call();
}

// FETCH USER DEVICE COLLECTION
function collection(state) {
    return refs(state).manager.fetch_collection(state.keys.public).call();
}

// NEW DEVICE ADDED EVENT
function added(state) {
    return refs(state).events.added()
}

export {
    details,
    fetch,
    collection,
    added
}