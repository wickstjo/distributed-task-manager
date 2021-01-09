import { transaction, assemble, animate } from '../blockchain';
import { decode } from '../process';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.device.methods,
        events: state.contracts.managers.device.events,
        address: state.contracts.managers.device._address
    }
}

// FETCH USER DEVICE COLLECTION
function initialized(state) {
    return state.contracts.managers.oracle.methods.initialized().call();
}

// FETCH USER DEVICE COLLECTION
function fetch(hash, state) {
    return refs(state).manager.fetch_device(hash).call();
}

// FETCH USER DEVICE COLLECTION
function collection(user, state) {
    return refs(state).manager.fetch_collection(user).call();
}

// FETCH DEVICE ASSIGNMENT BACKLOG
function config(hash, state) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    return manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return contract.methods.tags().call()
    })
}

// ADD DEVICE
function register(callback, hash, state, dispatch) {
    const { manager, address } = refs(state);

    const func = transaction({
        query: manager.add(hash),
        contract: address
    }, state)

    animate(func, callback, dispatch)
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
                discovery: decode(response[3]),
                services: response[4],
                active: response[5] ? 'True' : 'False',
                discoverable: response[6] ? 'True' : 'False'
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
                    discovery: decode(response.returnValues.tags),
                    services: response.returnValues.services,
                    active: response.returnValues.active ? 'True' : 'False',
                    discoverable: response.returnValues.discoverable ? 'True' : 'False'
                }
            })
        })
    })
}

// UPDATE IOT MIDDLEWARE
function update_middleware(callback, hash, state, dispatch) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    const func = manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return transaction({
            query: contract.methods.update_middleware(),
            contract: device
        }, state)
    })

    animate(func, callback, dispatch)
}

// UPDATE DISCOVERY TAGS
function update_tags(callback, hash, data, state, dispatch) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    const func = manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return transaction({
            query: contract.methods.update_tags(data),
            contract: device
        }, state)
    })

    animate(func, callback, dispatch)
}

// UPDATE DISCOVERY TAGS
function update_services(callback, hash, data, state, dispatch) {
    const { manager, address } = refs(state)

    const func = transaction({
        query: manager.set_services(hash, data),
        contract: address
    }, state)

    animate(func, callback, dispatch)
}

// UPDATE DISCOVERY TAGS
function add_service(callback, device, service, state, dispatch) {
    const { manager, address } = refs(state)

    const func = transaction({
        query: manager.add_service(device, service),
        contract: address
    }, state)

    animate(func, callback, dispatch)
}

// UPDATE DISCOVERY TAGS
function remove_service(callback, device, service, state, dispatch) {
    const { manager, address } = refs(state)

    const func = transaction({
        query: manager.remove_service(device, service),
        contract: address
    }, state)

    animate(func, callback, dispatch)
}

// TOGGLE ACTIVE STATUS
function toggle_active(callback, hash, state, dispatch) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    const func = manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return transaction({
            query: contract.methods.toggle_active(),
            contract: device
        }, state)
    })

    animate(func, callback, dispatch)
}

// TOGGLE DISCOVERY STATUS
function toggle_discovery(callback, hash, state, dispatch) {
    const { manager } = refs(state)

    // FETCH THE DEVICES SMART CONTRACT
    const func = manager.fetch_device(hash).call().then(device => {

        // CONSTRUCT CONTRACT
        const contract = assemble({
            address: device,
            contract: 'device'
        }, state);

        return transaction({
            query: contract.methods.toggle_discoverable(),
            contract: device
        }, state)
    })

    animate(func, callback, dispatch)
}


export {
    initialized,
    fetch,
    collection,
    register,
    device_added,
    details,
    changes,
    update_middleware,
    update_tags,
    update_services,
    toggle_active,
    toggle_discovery,
    config,
    add_service,
    remove_service
}