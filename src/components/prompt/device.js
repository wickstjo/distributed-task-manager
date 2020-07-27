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
         const identifier = '77efa3007270eccb6f4aed46482b3c4d598918a2aaa81b7ec1ce64db802c9e9d';
         
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