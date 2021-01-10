import { transaction, assemble, animate } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.task.methods,
        address: state.contracts.managers.task._address
    }
}

// FETCH TASK MANAGER INIT STATUS & TOKEN FEE
async function overview(state) {
    return [
        await refs(state).manager.initialized().call(),
        await refs(state).manager.fee().call()
    ]
}

// ADD TASK
function add(callback, service, device, encryption, timelimit, state, dispatch) {
    const { manager, address } = refs(state);

    const func = transaction({
        query: manager.add(service, device, encryption, timelimit),
        contract: address
    }, state)

    animate(func, callback, dispatch)
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
        contract.methods.service().call(),
        contract.methods.reward().call(),
        contract.methods.encryption().call(),
        contract.methods.expires().call()
    ]

    // WAIT FOR PROMISES TO RESOLVE, THEN RETURN THEM
    return Promise.all(promises).then(values => {
        return {
            creator: values[0],
            device: values[1],
            service: values[2],
            reward: values[3],
            encryption: values[4],
            expires: values[5]
        }
    })
}

// RETIRE TASK
function retire(callback, task, state, dispatch) {
    const { manager, address } = refs(state);

    const func = transaction({
        query: manager.retire(task),
        contract: address
    }, state)

    animate(func, callback, dispatch)
}

// FETCH TASK FEE
function result(task, state) {
    const { manager } = refs(state);
    return manager.fetch_result(task).call()
}

export {
    overview,
    add,
    details,
    retire,
    result
}