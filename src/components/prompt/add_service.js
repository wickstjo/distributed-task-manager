import React, { useContext, useEffect, useReducer, Fragment } from 'react';
import { Context } from '../../assets/context';
import { reducer } from '../shared/reducer';
import { update_tags, config } from '../../funcs/contract/device';
import { encode, decode } from '../../funcs/process';

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

   // FETCH CURRENT DATA
   useEffect(() => {
      config(state.trigger, state).then(result => {

         // DECODE & STRINGIFY
         const decoded = decode(result)
         const stringified = JSON.stringify(decoded, null, '\t')

         // SET IN STATE
         set_local({
            type: 'specific',
            payload: {
               name: 'tags',
               data: {
                  value: stringified,
                  validation: true
               }
            }
         })
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // PROCESS SUBMISSION
   function process() {

      // PARSE & ENCODE THE JSON DATA
      const encoded = encode(local.tags.value)
      
      // UPDATE DEVICE DISCOVERY TAGS
      update_tags(() => {

         // SUCCESS MESSAGE
         return 'device discovery config changed'

      }, state.trigger, encoded, state, dispatch)
   }

   return (
      <Fragment>
         <Header text={ 'Add Service to Device' } />
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