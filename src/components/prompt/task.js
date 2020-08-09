import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from "../../assets/context";
import { add } from '../../funcs/contract/task';
import { sleep } from '../../funcs/misc';

import Header from './header';
import Text from '../input/text';
import Number from '../input/number';
import Button from '../input/button';
import { reducer } from '../../states/input';

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
         timelimit: local.blocks.value
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
            placeholder={ 'Set performing device' }
            data={ local }
            category={ 'device' }
            dispatch={ set_local }
            limit={{
               min: 56,
               max: 56
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