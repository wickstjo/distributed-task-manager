import React, { useContext, Fragment, useReducer } from 'react';
import { Context } from "../../assets/context";
import { purchase } from '../../funcs/contract/token';
import { reducer } from '../shared/reducer';

import Header from './header';
import Number from '../input/number';
import Button from '../input/button';

function Token() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      amount: {
         value: '',
         validation: false
      }
   })

   // PROCESS SUBMISSION
   function process() {
      purchase(() => {

         // REDIRECT TO USER PAGE
         dispatch({
            type: 'redirect',
            payload: '/users/' + state.keys.public
         })

         // SUCCESS MESSAGE
         return local.amount.value + ' tokens have been added to your account'

      }, local.amount.value, state, dispatch)
   } 

   return (
      <Fragment>
         <Header text={ 'Purchase Tokens' } />
         <Number
            placeholder={ 'How many tokens would you like?' }
            data={ local }
            category={ 'amount' }
            dispatch={ set_local }
            limit={{
               min: 1,
               max: 10000
            }}
         />
         <Button
            value={ 'Submit Purchase' }
            fallback={ 'Fix the fields above first!' }
            execute={ process }
            required={[
               local.amount.validation
            ]}
         />
      </Fragment>
   )
}

export default Token;