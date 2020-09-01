import React, { useContext, useReducer, Fragment } from 'react';
import { Context } from "../../assets/context";
import { add, fetch_open } from '../../funcs/contract/task';
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
      service: {
         value: '',
         validation: false
      },
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
      add(async() => {

         // FETCH LATEST LIST OF OPEN TASKS
         const list = await fetch_open(state);

         // REDIRECT TO THE TASK PAGE
         dispatch({
            type: 'redirect',
            payload: '/tasks/' + list[list.length - 1]
         })

         // SUCCESS MESSAGE
         return 'THE TASK HAS BEEN CREATED & ASSIGNED'

      }, local.service.value, local.device.value, local.reward.value, local.encryption.value, local.blocks.value, state, dispatch)
   }

   return (
      <Fragment>
         <Header text={ 'Create New Task' } />
         <Text
            placeholder={ 'Set the service' }
            data={ local }
            category={ 'service' }
            dispatch={ set_local }
            limit={{
               min: 2,
               max: 64
            }}
         />
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
               local.service.validation,
               local.reward.validation,
               local.blocks.validation,
               local.encryption.validation,
               local.device.validation
            ]}
         />
      </Fragment>
   )
}

export default Task;