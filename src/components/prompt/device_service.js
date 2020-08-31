import React, { useContext, useEffect, Fragment, useReducer } from 'react';
import { Context } from "../../assets/context";
import { update_services, details } from '../../funcs/contract/device';
import { reducer } from '../shared/reducer';

import Header from './header';
import Button from '../input/button';
import Json from '../input/json';

function DeviceService() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      data: {
         value: '',
         validation: false
      }
   })

   // FETCH CURRENT DATA
   useEffect(() => {
      details(state.trigger, state).then(result => {

         // DECODE & STRINGIFY
         const stringified = JSON.stringify({
            services: result.services
         }, null, '\t')

         // SET IN STATE
         set_local({
            type: 'specific',
            payload: {
               name: 'data',
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

      // PARSE AS JSON
      const parsed = JSON.parse(local.data.value);

      // REGISTER THE DEVICE
      update_services(() => {

         // SUCCESS MESSAGE
         return 'THE DEVICE SERVICES HAVE BEEN UPDATED'

      }, state.trigger, parsed.services, state, dispatch)
   }

   return (
      <Fragment>
         <Header text={ 'Update Device Services' } />
         <Json
            placeholder={ 'Set device services' }
            data={ local }
            category={ 'data' }
            dispatch={ set_local }
         />
         <Button
            value={ 'Register Device' }
            fallback={ 'Fix the fields above first!' }
            execute={ process }
            required={[
               local.data.validation
            ]}
         />
      </Fragment>
   )
}

export default DeviceService;