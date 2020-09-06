import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../assets/context';
import { reducer } from '../shared/reducer';
import { add } from '../../funcs/contract/service';

import Header from './header';
import Text from '../input/text';
import Button from '../input/button';
import Number from '../input/number';

export default () => {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      name: {
         value: '',
         validation: false
      },
      price: {
         value: '',
         validation: false
      }
   })

   // PROCESS SUBMISSION
   function process() {

      // REGISTER THE SERVICE
      add(() => {

         // REDIRECT TO THE TAG PAGE
         dispatch({
            type: 'redirect',
            payload: '/services/' + local.name.value
         })

         // SUCCESS MESSAGE
         return 'the service was added'

      }, local.name.value, local.price.value, state, dispatch)
   }

   return (
      <Fragment>
         <Header text={ 'Add New Service' } />
         <Text
            placeholder={ 'Set the name' }
            data={ local }
            category={ 'name' }
            dispatch={ set_local }
            limit={{
               min: 2,
               max: 25
            }}
         />
         <Number
            placeholder={ 'Set the token price' }
            data={ local }
            category={ 'price' }
            dispatch={ set_local }
            limit={{
               min: 1,
               max: 1000
            }}
         />
         <Button
            value={ 'Create Service' }
            fallback={ 'Fix the fields above first!' }
            execute={ process }
            required={[
               local.name.validation,
               local.price.validation
            ]}
         />
      </Fragment>
   )
}