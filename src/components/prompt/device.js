import React, { useContext, useState } from 'react';
import { Context } from "../../assets/context";
import { sleep } from '../../funcs/misc';
import { register } from '../../funcs/contract/device';

function Device() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [input, set_input] = useState('')

   // PROCESS SUBMISSION
   function process() {
      if (input !== '' && validate(input)) {

         // HARDCODED DEVICE ID -- FOR NOW
         const identifier = 'd7fdb8228681c9999294d997a0f21f58820115d5c830db4efe0fc7e9';
         
         // SHOW THE LOADING SCREEN
         dispatch({
            type: 'show-prompt',
            payload: 'loading'
         })

         // REGISTER THE DEVICE
         register(identifier, state).then(() => {

            // SLEEP FOR 2 SECONDS, THEN HIDE PROMPT
            sleep(2000).then(() => {
               dispatch({
                  type: 'hide-prompt'
               })
            })
         })
      } 
   }

   // VALIDATE JSON OBJECT
   function validate(data) {
      try {
         JSON.parse(data)
         return true;
      } catch {
         console.log('validation error')
         return false
      }
   }

   return (
      <div id={ 'device' }>
         <div id={ 'top' }>Register Device</div>
         <textarea
            placeholder={ 'Paste in the JSON identifier' }
            value={ input }
            onChange={ event => set_input(event.target.value) }
         />
         <input
            type={ 'submit' }
            value={ 'Submit' }
            onClick={ process }
            id={ 'submit' }
         />
      </div>
   )
}

export default Device;