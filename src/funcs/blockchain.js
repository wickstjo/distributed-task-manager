import Web3 from 'web3';
import { gateway, keys, whisper } from '../settings.json';
import references from '../latest.json';

// PARSE SC & WEB3
async function init(state) {

   // ESTABLISH WEB3 CONNECTION
   const web3 = new Web3('ws://' + gateway.host + ':' + gateway.port);

   // GENERATE WHISPER ID
   const identification = await web3.shh.newKeyPair();

   // GENERATE NEW WHISPER TOPIC SYMKEY
   //const foo = await web3.shh.newSymKey()
   //console.log(foo)

   // RETURN WITH REFERENCES
   return {
      web3: web3,
      shh: web3.shh,
      contracts: {
         managers: managers([
            'user',
            'device',
            'task',
            'token',
            'service'
         ], web3),
         interfaces: interfaces([
            'user',
            'device',
            'task'
         ])
      },
      keys: keys,
      whisper: {
         ...state.whisper,
         topic: whisper.topic,
         id: identification
      },
      utils: {
         to_string: web3.utils.hexToString,
         to_hex: web3.utils.stringToHex
      }
   }
}

// CONSTRUCT SMART CONTRACT REFERENCE
function managers(names, web3) {
    
   // RESPONSE PLACEHOLDER
   const response = {};

   // LOOP THROUGH & COMBINE EACH ABI & ADDRESS
   names.forEach(name => {
      response[name] = new web3.eth.Contract(
         references[name + 'manager'].abi,
         references[name + 'manager'].address
      )
   })

   return response;
}

// FETCH SINGLE CONTRACT INTERFACE
function interfaces(names) {

   // RESPONSE PLACEHOLDER
   const response = {}

   // LOOP THROUGH & ATTACH ABI
   names.forEach(name => {
      response[name] = references[name].abi
   })

   return response;
}

// SIGN SC TRANSACTION
function transaction({ query, contract, payable }, state) {

   // TRANSACTION OUTLINE
   const tx = {
      from: state.keys.public,
      to: contract,
      data: query.encodeABI()
   }

   // IF PAYABLE WAS DEFINED, ADD VALUE PROP TO TRANSACTION -- ROUND UP
   if (payable !== undefined) {
      tx.value = Math.ceil(payable);
   }

   // ESTIMATE GAS PRICE
   return query.estimateGas(tx).then(price => {

      // ADD GAS PROPERTY TO TRANSACTION
      tx.gas = price;

      // SIGN IT & EXECUTE
      return state.web3.eth.accounts.signTransaction(tx, state.keys.private).then(signed => {
         return state.web3.eth.sendSignedTransaction(signed.rawTransaction).then(() => {
            return {
               success: true
            }

         // IF THE TRANSACTION FAILS
         }).catch(error => {
            return {
               reason: error
            }
         })
      })

   // IF THE GAS ESTIMATION FAILS
   }).catch(error => {
      return {
         reason: error
      }
   })
}

// ANIMATE PROMPT
function animate(func, callback, dispatch) {

   // SHOW LOADING SCREEN
   dispatch({
      type: 'show-prompt',
      payload: 'loading'
   })

   // EXECUTE THE PRIMARY FUNCTION
   func.then(result => {

      // IF THE TRANSACTION WENT THROUGH
      if (result.success) {

         // IF THE CALLBACK IS ASYNC
         if (callback.constructor.name === 'AsyncFunction') {

            // AFTERWARDS, 
            callback().then(response => {

               // ALERT WITH SUCCESS
               dispatch({
                  type: 'alert',
                  payload: {
                     text: response,
                     type: 'good'
                  }
               })

               // FINALLY HIDE THE LOADING SCREEN
               dispatch({
                  type: 'hide-prompt'
               })
            })

         // OTHERWISE..
         } else {

            // EXECUTE CALLBACK & GET RESPONSE TEXT
            const response = callback()

            // ALERT WITH SUCCESS
            dispatch({
               type: 'alert',
               payload: {
                  text: response,
                  type: 'good'
               }
            })

            // FINALLY HIDE THE LOADING SCREEN
            dispatch({
               type: 'hide-prompt'
            })
         }

      // OTHERWISE...
      } else {

         // ALERT WITH ERROR
         dispatch({
            type: 'alert',
            payload: {
               text: 'transaction reverted',
               type: 'bad'
            }
         })

         // FINALLY HIDE THE LOADING SCREEN
         dispatch({
            type: 'hide-prompt'
         })
      }
   })
}

// CALL SC METHOD
function call({ query, modify }) {
   return query.call().then(response => {
      switch(modify) {

         // UNMODIFIED
         case undefined: { return {
            success: true,
            data: response
         }}

         // MODIFIED
         default: { return {
            success: true,
            data: modify(response)
         }}
      }
   }).catch(error => {
      return {
         reason: error
      }
   })
}

// CHECK ADDRESS INDEXATION
function exists(query) {
   if (query === '0x0000000000000000000000000000000000000000') {
      return false;
   } else {
      return true;
   }
}

// ASSEMBLE SINGLE CONTRACT REFERENCE
function assemble({ address, contract }, state) {
   return new state.web3.eth.Contract(
      state.contracts.interfaces[contract],
      address
   )
}

export {
   init,
   transaction,
   call,
   assemble,
   exists,
   animate
}