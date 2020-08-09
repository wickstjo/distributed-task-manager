import React, { useContext, Fragment, useReducer } from 'react';
import { Context } from "../../assets/context";
import { sleep } from '../../funcs/misc';
import { register } from '../../funcs/contract/device';

import Header from './header';
import Button from '../input/button';
import Json from '../input/json';
import { reducer } from '../../states/input';

function Device() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      identifier: {
         value: '',
         validation: false
      }
   })

   // PROCESS SUBMISSION
   function process() {

      // HARDCODED DEVICE ID -- FOR NOW
      const dev_id = 'd7fdb8228681c9999294d997a0f21f58820115d5c830db4efe0fc7e9';
      console.log(local.identifier.value)
      
      // SHOW THE LOADING SCREEN
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // REGISTER THE DEVICE
      register(dev_id, state).then(() => {

         // SLEEP FOR 2 SECONDS, THEN HIDE PROMPT
         sleep(2000).then(() => {
            dispatch({
               type: 'hide-prompt'
            })
         })
      })
   }

   return (
      <Fragment>
         <Header text={ 'Register Device' } />
         <Json
            placeholder={ 'Set the identifier' }
            data={ local }
            category={ 'identifier' }
            dispatch={ set_local }
         />
         <Button
            value={ 'Register Device' }
            fallback={ 'Fix the fields above first!' }
            execute={ process }
            required={[
               local.identifier.validation
            ]}
         />
      </Fragment>
   )
}

export default Device;