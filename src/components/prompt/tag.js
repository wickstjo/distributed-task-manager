import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../assets/context';
import { reducer } from '../shared/reducer';
import { add } from '../../funcs/contract/tag';
import { sleep } from '../../funcs/misc';
import { Base64 as compression } from 'js-base64';

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
      const parsed = JSON.parse(local.json.value)
      const stringified = JSON.stringify(parsed)
      const encoded = compression.encode(stringified)
      
      // SHOW THE LOADING SCREEN
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // REGISTER THE DEVICE
      add({
         name: local.name.value,
         description: encoded
      }, state).then(() => {

         // SLEEP FOR 2 SECONDS, THEN HIDE PROMPT
         sleep(2000).then(() => {
            dispatch({
               type: 'hide-prompt'
            })
         })
      })
   }

   return (
      <Fragment>
         <Header text={ 'Add New Tag' } />
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