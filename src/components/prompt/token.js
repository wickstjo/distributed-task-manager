import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../assets/context";
import { sleep } from '../../funcs/misc';
import { price as get_price, purchase } from '../../funcs/contract/token';

function Device() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [input, set_input] = useState('')
   const [price, set_price] = useState('')

   // ON LOAD
   useEffect(() => {

      // FETCH TOKEN PRICE
      get_price(state).then(amount => {
         set_price(amount)
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // PROCESS SUBMISSION
   function process() {
      if (input > 0) {
         
         // SHOW THE LOADING SCREEN
         dispatch({
            type: 'show-prompt',
            payload: 'loading'
         })

         // EXECUTE THE PURCHASE
         purchase(input, state).then(() => {

            // SLEEP FOR 2 SECONDS, THEN HIDE PROMPT
            sleep(2000).then(() => {
               dispatch({
                  type: 'hide-prompt'
               })
            })
         })
      }
   } 

   return (
      <div id={ 'device' }>
         <div id={ 'top' }>Purchase Tokens</div>
         <div id={ 'cont' }>
            <div id={ 'inp' }>
               <input
                  placeholder={ 'Input a sufficient amount of tokens' }
                  type={ 'number' }
                  value={ input }
                  onChange={ event => set_input(event.target.value) }
               />
            </div>
            <div id={ 'total' }>
               <div className={ 'split' }>
                  <div>Total Cost</div>
                  <div>{ input * price } WEI</div>
               </div>
            </div>
         </div>
         <input
            type={ 'submit' }
            value={ 'Purchase' }
            onClick={ process }
            id={ 'submit' }
         />
      </div>
   )
}

export default Device;