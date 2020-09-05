import React, { useContext, useEffect, useReducer, Fragment } from 'react';
import { Context } from '../../assets/context';
import { reducer } from '../shared/reducer';
import { details, remove_service } from '../../funcs/contract/device';
import { filter_zeros } from '../../funcs/format';

import Header from './header';
import Button from '../input/button';
import Selection from '../input/selection';

export default () => {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      services: [],
      selected: {
         value: '',
         validation: false
      }
   })

   // FETCH CURRENT DATA
   useEffect(() => {
      details(state.trigger, state).then(result => {

         // FILTER GARBAGE
         const filtered = filter_zeros(result.services)

         // SET IN STATE
         set_local({
            type: 'specific',
            payload: {
               name: 'services',
               data: filtered
            }
         })
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // PROCESS SUBMISSION
   function process() {
      remove_service(() => {

         // SUCCESS MESSAGE
         return 'THE SERVICE WAS REMOVED FROM YOUR DEVICE'

      }, state.trigger, local.selected.value, state, dispatch)
   }

   return (
      <Fragment>
         <Header text={ 'Remove Service from Device' } />
         <Selection
            data={ local.services }
            current={ local.selected.value }
            fallback={ 'This device has no assigned services.' }
            dispatch={ set_local }
         />
         <Button
            value={ 'Add The Service' }
            fallback={ 'Select a service to remove!' }
            execute={ process }
            required={[
               local.selected.validation
            ]}
         />
      </Fragment>
   )
}