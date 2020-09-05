import React, { useContext, useEffect, useReducer, Fragment } from 'react';
import { Context } from '../../assets/context';
import { reducer } from '../shared/reducer';
import { collection, add_service } from '../../funcs/contract/device';

import Header from './header';
import Button from '../input/button';
import Selection from '../input/selection';

export default () => {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      devices: [],
      selected: {
         value: '',
         validation: false
      }
   })

   // FETCH CURRENT DATA
   useEffect(() => {
      collection(state.keys.public, state).then(result => {

         // SET IN STATE
         set_local({
            type: 'specific',
            payload: {
               name: 'devices',
               data: result
            }
         })
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // PROCESS SUBMISSION
   function process() {
      add_service(() => {

         // REDIRECT TO DEVICE PAGE
         dispatch({
            type: 'redirect',
            payload: '/devices/' + local.selected.value
         })

         // SUCCESS MESSAGE
         return 'THE SERVICE WAS ADDED TO YOUR DEVICE'

      }, local.selected.value, state.trigger, state, dispatch)
   }

   return (
      <Fragment>
         <Header text={ 'Add Service to Device' } />
         <Selection
            data={ local.devices }
            current={ local.selected.value }
            dispatch={ set_local }
         />
         <Button
            value={ 'Add The Service' }
            fallback={ 'Select a device to assign service to!' }
            execute={ process }
            required={[
               local.selected.validation
            ]}
         />
      </Fragment>
   )
}