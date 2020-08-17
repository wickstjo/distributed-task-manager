import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from '../../assets/context';
import { reducer } from '../shared/reducer';
import { update_tags } from '../../funcs/contract/device';
import { sleep } from '../../funcs/misc';
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
      
      // SHOW THE LOADING SCREEN
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // REGISTER THE DEVICE
      update_tags({
         hash: state.trigger,
         data: encoded
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