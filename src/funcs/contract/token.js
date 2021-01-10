import { transaction, animate } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.token.methods,
        address: state.contracts.managers.token._address
    }
}

// FETCH TOKEN DETAILS
async function details(state) {
    return [
        await refs(state).manager.initialized().call(),
        await refs(state).manager.symbol().call(),
        await refs(state).manager.price().call(),
        await refs(state).manager.capacity().call(),
        await refs(state).manager.sold().call(),
        await balance(state)
    ]
}

// FETCH USERS TOKEN BALANCE
function balance(state) {
    return refs(state).manager.balance(state.keys.public).call()
}

// TOKEN CONTRACT CHANGE EVENT
function changes(state) {
    return state.contracts.managers.token.events.changes()
}

// BUY TOKEN
function purchase(callback, amount, state, dispatch) {
    const { manager, address } = refs(state);

    // FETCH THE TOKEN PRICE
    const func = manager.price().call().then(price => {

        // EXECUTE THE TRANSACTION
        return transaction({
            query: manager.purchase(amount),
            contract: address,
            payable: amount * price
        }, state)
    })

    // ANIMATE EXECUTION
    animate(func, callback, dispatch)
}

// TRANSFER TOKENS
function transfer(amount, recipient, state) {
    const { manager, address } = refs(state);

    return transaction({
        query: manager.transfer_token(amount, recipient),
        contract: address
    }, state)
}

export {
details,
changes,
balance,
purchase,
transfer
}