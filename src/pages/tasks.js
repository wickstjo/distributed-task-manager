import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import { fetch_open } from '../funcs/contract/task';
import List from '../components/shared/list';
import Actions from '../components/tasks/actions';
import '../interface/css/tasks.scss';

function Tasks() {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [tasks, set_tasks] = useState([])

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'tasks'
      })
      
      // FETCH ALL OPEN TASKS & SET THEM IN LOCAL STATE
      fetch_open(state).then(result => {
         set_tasks(result)
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tasks' }>
         <div id={ 'inner' }>
            <div id={ 'header' }>Incomplete tasks ({ tasks.length })</div>
            <List
               data={ tasks }
               fallback={ 'No tasks found.' }
            />
            <Actions
               state={ state }
               dispatch={ dispatch }
               category={ 'tasks' }
            />
         </div>
      </div>
   )
}

export default Tasks;