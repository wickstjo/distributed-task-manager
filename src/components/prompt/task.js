import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from "../../assets/context";
import { add, fetch_open } from '../../funcs/contract/task';
import { sleep } from '../../funcs/misc';
import { reducer } from '../shared/reducer';

import Header from './header';
import Text from '../input/text';
import Number from '../input/number';
import Button from '../input/button';

function Task() {

   // GLOBAL CONTEXT
   const { state, dispatch } = useContext(Context);

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      reward: {
         value: '',
         validation: false
      },
      blocks: {
         value: '',
         validation: false
      },
      encryption: {
         value: '',
         validation: false
      },
      device: {
         value: '',
         validation: false
      }
   })

   // PROCESS TASK
   function process() {
         
      // SHOW THE LOADING SCREEN
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // SUBMIT THE TASK
      add({
         device: local.device.value,
         reward: local.reward.value,
         encryption: local.encryption.value,
         timelimit: local.blocks.value
      }, state).then(() => {

         // FETCH OPEN TASKS
         fetch_open(state).then(list => {
            
            // SLEEP FOR 2 SECONDS
            sleep(2000).then(() => {

               // REDIRECT TO THE TASK PAGE
               dispatch({
                  type: 'redirect',
                  payload: '/tasks/' + list[list.length - 1]
               })

               // FINALLY HIDE THE PROMPT
               dispatch({
                  type: 'hide-prompt'
               })
            })
         })
      })
   }

   return (
      <Fragment>
         <Header text={ 'Create New Task' } />
         <Number
            placeholder={ 'Set the token reward' }
            data={ local }
            category={ 'reward' }
            dispatch={ set_local }
            limit={{
               min: 1,
               max: 1000
            }}
         />
         <Number
            placeholder={ 'Set the timelimit in blocks' }
            data={ local }
            category={ 'blocks' }
            dispatch={ set_local }
            limit={{
               min: 5,
               max: 1000
            }}
         />
         <Text
            placeholder={ 'Set encryption key' }
            data={ local }
            category={ 'encryption' }
            dispatch={ set_local }
            limit={{
               min: 5,
               max: 64
            }}
         />
         <Text
            placeholder={ 'Set performing device' }
            data={ local }
            category={ 'device' }
            dispatch={ set_local }
            limit={{
               min: 64,
               max: 64
            }}
         />
         <Button
            value={ 'Submit Task' }
            fallback={ 'Fix the fields above first!' }
            execute={ process }
            required={[
               local.reward.validation,
               local.blocks.validation,
               local.device.validation
            ]}
         />
      </Fragment>
   )
}

export default Task;