import { transaction, assemble } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.device.methods,
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

// FETCH DEVICE DETAILS
async function device_overview(hash, state) {

    // FETCH THE DEVICES CONTRACT
    const device = await refs(state).manager.fetch_device(hash).call();
    
    // CONSTRUCT CONTRACT
    const contract = assemble({
        address: device,
        contract: 'device'
    }, state);

    return {
        name: await contract.methods.name().call(),
        owner: await contract.methods.owner().call(),
        contract: device
    }
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

export {
    fetch,
    collection,
    backlog,
    device_overview,
    register
}