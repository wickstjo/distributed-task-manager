import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../assets/context';
import { reducer } from '../shared/reducer';
import { add } from '../../funcs/contract/service';
import { encode } from '../../funcs/process';

import Header from './header';
import Text from '../input/text';
import Button from '../input/button';
import Json from '../input/json';

function Tag() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      name: {
         value: '',
         validation: false
      },
      json: {
         value: '',
         validation: false
      }
   })

   // PROCESS SUBMISSION
   function process() {

      // PARSE & ENCODE THE JSON DATA
      const encoded = encode(local.json.value)

      // REGISTER THE SERVICE
      add(() => {

         // REDIRECT TO THE TAG PAGE
         dispatch({
            type: 'redirect',
            payload: '/services/' + local.name.value
         })

         // SUCCESS MESSAGE
         return 'the service tag was added'

      }, local.name.value, encoded, state, dispatch)
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
               min: 4,
               max: 15
            }}
         />
         <Json
            placeholder={ 'Set the description' }
            data={ local }
            category={ 'json' }
            dispatch={ set_local }
         />
         <Button
            value={ 'Submit Tag' }
            fallback={ 'Fix the fields above first!' }
            execute={ process }
            required={[
               local.name.validation,
               local.json.validation
            ]}
         />
      </Fragment>
   )
}

export default Tag;