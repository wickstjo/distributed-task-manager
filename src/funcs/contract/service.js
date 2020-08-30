import { transaction, animate } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.service.methods,
        address: state.contracts.managers.service._address
    }
}

// FETCH ALL TAGS
function services(state) {
    const { manager } = refs(state);
    return manager.fetch_services().call();
}

// ADD TAG
function add(callback, name, description, state, dispatch) {
    const { manager, address } = refs(state);

    const func = transaction({
        query: manager.add(name, description),
        contract: address
    }, state)

    animate(func, callback, dispatch)
}

// TAG ADDED EVENT
function added(state) {
    return state.contracts.managers.service.events.added();
}

// FETCH ALL TAGS
function details(name, state) {
    const { manager } = refs(state);
    return manager.fetch_service(name).call();
}

export {
    services,
    add,
    added,
    details
}