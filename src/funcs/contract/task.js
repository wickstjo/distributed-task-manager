import { transaction, assemble } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.task.methods,
        address: state.contracts.managers.task._address
    }
}

// FETCH ALL OPEN TASKS
function fetch_open(state) {
    return refs(state).manager.fetch_open().call();
}

// FETCH TASK FEE
function fee(state) {
    const { manager } = refs(state);
    return manager.fee().call()
}

// ADD TASK
function add({ device, reward, timelimit  }, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.add(device, reward, timelimit),
        contract: address
    }, state)
}

// CHANGE IN OPEN TASKS EVENT
function change(state) {
    return state.contracts.managers['task'].events.change();
}

// FETCH TASK AUT
function details(task, state) {

    // GENERATE REFERENCE
    const contract = assemble({
        address: task,
        contract: 'task'
    }, state);

    // LIST OF PROMISES
    const promises = [
        contract.methods.creator().call(),
        contract.methods.device().call(),
        contract.methods.reward().call(),
        contract.methods.expires().call()
    ]

    // WAIT FOR PROMISES TO RESOLVE, THEN RETURN THEM
    return Promise.all(promises).then(values => {
        return {
            creator: values[0],
            device: values[1],
            reward: values[2],
            expires: values[3]
        }
    })
}

// FORCE COMPLETE TASK
function complete(task, state) {
    const { manager, address } = refs(state);

    const ipfs = 'QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u'
    const key = '0x4f7a87EE7A53ae8606e80FE96a47038DF8ab7956'

    return transaction({
        query: manager.complete(task, ipfs, key),
        contract: address
    }, state)
}

// RETIRE TASK
function retire(task, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.retire(task),
        contract: address
    }, state)
}

// FETCH TASK FEE
function result(task, state) {
    const { manager } = refs(state);
    return manager.fetch_result(task).call()
}

export {
    fee,
    fetch_open,
    add,
    change,
    details,
    complete,
    retire,
    result
}