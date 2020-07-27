import React, { useContext, useState } from 'react';
import { Context } from "../../assets/context";
import { add } from '../../funcs/contract/task';
import { sleep } from '../../funcs/misc';

function Task() {

   // GLOBAL CONTEXT
   const { state, dispatch } = useContext(Context);

   // LOCAL STATES
   const [reward, set_reward] = useState('')
   const [blocks, set_blocks] = useState('')
   const [device, set_device] = useState('')

   // PROCESS TASK
   function process() {
      if (reward > 0 && blocks > 0 && device !== '') {
         
         // SHOW THE LOADING SCREEN
         dispatch({
            type: 'show-prompt',
            payload: 'loading'
         })

         // SUBMIT THE TASK
         add({
            device: device,
            reward: reward,
            timelimit: blocks
         }, state).then(() => {

            // SLEEP FOR 2 SECONDS, THEN HIDE PROMPT
            sleep(2000).then(() => {
               dispatch({
                  type: 'hide-prompt'
               })
            })
         })
      }  
   }

   return (
      <div id={ 'task' }>
         <div id={ 'top' }>Create New Task</div>
         <div id={ 'cont' }>
            <div id={ 'inp' }>
               <input
                  placeholder={ 'Set a token reward' }
                  type={ 'number' }
                  value={ reward }
                  onChange={ event => set_reward(event.target.value) }
               />
            </div>
            <div id={ 'inp' }>
               <input
                  placeholder={ 'Set a timelimit in blocks' }
                  type={ 'number' }
                  value={ blocks }
                  onChange={ event => set_blocks(event.target.value) }
               />
            </div>
            <div id={ 'inp' }>
               <input
                  placeholder={ 'Set a device to execute the task' }
                  type={ 'text' }
                  value={ device }
                  onChange={ event => set_device(event.target.value) }
               />
            </div>
         </div>
         <input
            type={ 'submit' }
            value={ 'Create Task' }
            onClick={ process }
            id={ 'submit' }
         />
      </div>
   )
}

export default Task;