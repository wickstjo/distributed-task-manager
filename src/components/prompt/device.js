import React, { useContext, Fragment, useReducer } from 'react';
import { Context } from "../../assets/context";
import { register } from '../../funcs/contract/device';
import { reducer } from '../shared/reducer';
import { hash } from '../../funcs/process';

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

      // PROCESS BOTH JSON OBJECTS
      const hash_id = hash(local.identifier.value)

      // REGISTER THE DEVICE
      register(() => {

         // REDIRECT TO DEVICE PAGE
         dispatch({
            type: 'redirect',
            payload: '/devices/' + hash_id
         })

         // SUCCESS MESSAGE
         return 'THE DEVICE HAS BEEN ADDED TO YOUR COLLECTION'

      }, hash_id, state, dispatch)
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