import React, { useContext, useState } from 'react';
import { Context } from "../assets/context";
import '../interface/css/actions.scss';

import Tasks from './actions/tasks';
import Task from './actions/task';
import Token from './actions/token';
import Device from './actions/device';
import Tag from './actions/tag';
import Profile from './actions/profile';

// PROMPT CONTAINER
function Actions() {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // PAGES WITH ACTIONS
   const [whitelist] = useState([
      'tasks',
      'task',
      'tags',
      'device',
      'tokens',
      'profile'
   ])

   // IF THE PAGE HAS ACTIONS
   if (whitelist.includes(state.header)) {
      return (
         <div id={ 'actions' }>
            <div id={ 'inner' }>
               <Content
                  state={ state }
                  dispatch={ dispatch }
               />
            </div>
         </div>
      )

   // OTHERWISE, RETURN NOTHING
   } else { return null; }
}

// PROMPT CONTENT
function Content({ state, dispatch }) {
   switch(state.header) {

      // TASKS ACTIONS
      case 'tasks': { return (
         <Tasks
            state={ state }
            dispatch={ dispatch }
         />
      )}

      // TASK ACTIONS
      case 'task': { return (
         <Task
            state={ state }
            dispatch={ dispatch }
         />
      )}

      // DEVICE ACTIONS
      case 'device': { return (
         <Device
            state={ state }
            dispatch={ dispatch }
         />
      )}

      // DEVICE ACTIONS
      case 'profile': { return (
         <Profile
            state={ state }
            dispatch={ dispatch }
         />
      )}

      // TOKEN ACTIONS
      case 'tokens': { return (
         <Token
            state={ state }
            dispatch={ dispatch }
         />
      )}

      // TAG ACTIONS
      case 'tags': { return (
         <Tag
            state={ state }
            dispatch={ dispatch }
         />
      )}

      // FALLBACK
      default: { return (
         <div>Action type not found!</div>
      )}
   }
}

export default Actions;