import { transaction, animate } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
    return {
        manager: state.contracts.managers.token.methods,
        address: state.contracts.managers.token._address
    }
}

// FETCH TOKEN DETAILS
function details(state) {

    // LIST OF PROMISES
    const promises = [
        refs(state).manager.initialized().call(),
        refs(state).manager.symbol().call(),
        refs(state).manager.price().call(),
        refs(state).manager.capacity().call(),
        refs(state).manager.sold().call(),
        balance(state)
    ]

    // WAIT FOR PROMISES TO RESOLVE, THEN RETURN THEM
    return Promise.all(promises).then(values => {
        return values
    })
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