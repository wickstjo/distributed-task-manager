import { transaction, assemble } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.user.methods,
        address: state.contracts.managers.user._address
    }
}

// FETCH USER SMART CONTRACT
function fetch(user, state) {
    const { manager } = refs(state);
    return manager.fetch(user).call();
}

// FETCH USER ADDRESS
async function user_overview(user, state) {
    const { manager } = refs(state);

    // USER CONTRACT LOCATION
    const location = await manager.fetch_user(user).call();

    // CONSTRUCT USER CONTRACT
    const contract = assemble({
        address: location,
        contract: 'user'
    }, state);

    return {
        details: {
            name: await contract.methods.name().call(),
            reputation: await contract.methods.reputation().call()
        },
        completed: await contract.methods.fetch_completed().call()
    }
}

// FETCH TASK RESULT
async function fetch_result(task, user, state) {
    const { manager } = refs(state);

    // USER CONTRACT LOCATION
    const location = await manager.fetch_user(user).call();

    // CONSTRUCT USER CONTRACT
    const contract = assemble({
        address: location,
        contract: 'user'
    }, state);

    // FETCH THE TASKS DATA STRUCT
    const result = await contract.methods.fetch_result(task).call();

    return {
        ipfs: result.ipfs,
        key: result.key
    }
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
    user_overview,
    fetch_result,
    register
}