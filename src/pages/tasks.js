import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import { fetch_open } from '../funcs/contract/task';
import List from '../components/shared/list';
import Info from '../components/shared/info';
import Actions from '../components/tasks/actions';
import { fee as get_fee } from '../funcs/contract/task';
import '../interface/css/tasks.scss';

function Tasks() {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [tasks, set_tasks] = useState([])
   const [fee, set_fee] = useState('')

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

      // FETCH & SET TASK FEE
      get_fee(state).then(amount => {
         set_fee(amount)
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tasks' }>
         <div id={ 'inner' }>
            <div id={ 'header' }>Task Manager</div>
            <Info
               data={{
                  'Contract': state.contracts.managers.task._address,
                  'Token Fee': fee
               }}
            />
            <div id={ 'header' }>Incomplete tasks ({ tasks.length })</div>
            <List
               data={ tasks }
               fallback={ 'No tasks found.' }
               category={ 'tasks' }
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