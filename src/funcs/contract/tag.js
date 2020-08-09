// import { transaction, assemble } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.tag.methods,
        address: state.contracts.managers.tag._address
    }
}

function tags(state) {
    const { manager } = refs(state);
    return manager.fetch_tags().call();
}

export {
    tags
}