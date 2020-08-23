import React, { useContext, Fragment, useReducer } from 'react';
import { Context } from "../../assets/context";
import { sleep } from '../../funcs/misc';
import { register } from '../../funcs/contract/device';
import { reducer } from '../shared/reducer';
import { encode, hash } from '../../funcs/process';

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
      },
      discovery: {
         value: '',
         validation: false
      }
   })

   // PROCESS SUBMISSION
   function process() {

      // PROCESS BOTH JSON OBJECTS
      const hash_id = hash(local.identifier.value)
      const encoded_config = encode(local.discovery.value)
      
      // SHOW THE LOADING SCREEN
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // REGISTER THE DEVICE
      register(hash_id, encoded_config, state).then(() => {

         // SLEEP FOR 2 SECONDS
         sleep(2000).then(() => {

            // REDIRECT TO DEVICE PAGE
            dispatch({
               type: 'redirect',
               payload: '/devices/' + hash_id
            })

            // FINALLY HIDE PROMPT
            dispatch({ type: 'hide-prompt' })
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
         <Json
            placeholder={ 'Set the discovery config' }
            data={ local }
            category={ 'discovery' }
            dispatch={ set_local }
         />
         <Button
            value={ 'Register Device' }
            fallback={ 'Fix the fields above first!' }
            execute={ process }
            required={[
               local.identifier.validation,
               local.discovery.validation
            ]}
         />
      </Fragment>
   )
}

export default Device;