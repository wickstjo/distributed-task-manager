import { transaction, assemble } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.tag.methods,
        address: state.contracts.managers.tag._address
    }
}

// FETCH USER SMART CONTRACT
function formats(state) {
    const { manager } = refs(state);
    return manager.fetch_formats().call();
}

function transpiler(state) {
    const { manager } = refs(state);
    return manager.transpiler().call();
}

export {
    formats,
    transpiler
}