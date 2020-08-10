import { transaction } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.tag.methods,
        address: state.contracts.managers.tag._address
    }
}

// FETCH ALL TAGS
function tags(state) {
    const { manager } = refs(state);
    return manager.fetch_tags().call();
}

// ADD TAG
function add({ name, description }, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add_tag(name, description),
        contract: address
    }, state)
}

// TAG ADDED EVENT
function added(state) {
    return state.contracts.managers.tag.events.added();
}

// FETCH ALL TAGS
function details(name, state) {
    const { manager } = refs(state);
    return manager.fetch_tag(name).call();
}

export {
    tags,
    add,
    added,
    details
}