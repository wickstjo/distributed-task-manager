import React, { useContext, Fragment, useReducer } from 'react';
import { Context } from "../../assets/context";
import { sleep } from '../../funcs/misc';
import { register } from '../../funcs/contract/device';
import { reducer } from '../shared/reducer';
import hashing from 'sha256';

import Header from './header';
import Button from '../input/button';
import Json from '../input/json';

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

      // PARSE & STRINGIFY THE JSON OBJECT
      const parsed = JSON.parse(local.identifier.value)
      const stringified = JSON.stringify(parsed, null, 2)

      // HASH THE STRING
      const result = hashing(stringified)
      
      // SHOW THE LOADING SCREEN
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // REGISTER THE DEVICE
      register(result, state).then(() => {

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