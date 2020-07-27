import { transaction } from '../blockchain';

// CONTRACT REFERENCES
function refs(state) {
   return {
      manager: state.contracts.managers.token.methods,
      address: state.contracts.managers.token._address
   }
}

// FETCH TOKEN PRICE
function price(state) {
    const { manager } = refs(state);
    return manager.price().call()
}


// FETCH USERS TOKEN BALANCE
function balance(state) {
    const { manager } = refs(state);
    return manager.balance(state.keys.public).call()
}

// BUY TOKEN
function purchase(amount, state) {
   const { manager, address } = refs(state);

   // FETCH THE TOKEN PRICE
   return manager.price().call().then(price => {

      // EXECUTE THE TRANSACTION
      return transaction({
         query: manager.purchase(amount),
         contract: address,
         payable: amount * price
      }, state)
   })
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
   price,
   balance,
   purchase,
   transfer
}