import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../assets/context';

import Header from './header';
import Text from '../input/text';
import Button from '../input/button';
import Json from '../input/json';
import { reducer } from '../../states/input';

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
      console.log(state, dispatch)
   }

   return (
      <Fragment>
         <Header text={ 'Add A New Tag' } />
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