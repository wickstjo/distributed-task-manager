import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../assets/context';
import { reducer } from '../shared/reducer';
import { update_tags } from '../../funcs/contract/device';
import { encode } from '../../funcs/process';

import Header from './header';
import Button from '../input/button';
import Json from '../input/json';

function Config() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      tags: {
         value: '',
         validation: false
      }
   })

   // PROCESS SUBMISSION
   function process() {

      // PARSE & ENCODE THE JSON DATA
      const encoded = encode(local.tags.value)
      
      // UPDATE DEVICE DISCOVERY TAGS
      update_tags(() => {

         // SUCCESS MESSAGE
         return 'device discovery tags changed'

      }, state.trigger, encoded, state, dispatch)
   }

   return (
      <Fragment>
         <Header text={ 'Update Discovery Tags' } />
         <Json
            placeholder={ 'Set the tags' }
            data={ local }
            category={ 'tags' }
            dispatch={ set_local }
         />
         <Button
            value={ 'Submit Tag' }
            fallback={ 'Fix the fields above first!' }
            execute={ process }
            required={[
               local.tags.validation
            ]}
         />
      </Fragment>
   )
}

export default Config;