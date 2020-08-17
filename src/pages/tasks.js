import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import { fetch_open } from '../funcs/contract/task';
import List from '../components/shared/list';
import Info from '../components/shared/info';
import Actions from '../components/actions/tasks';
import { fee as get_fee, change } from '../funcs/contract/task';
import '../interface/css/tasks.scss';

function Tasks() {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATES
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

      // SUBSCRIBE TO TASK FEED ON MOUNT
      const feed = change(state).on('data', response => {
         const data = response.returnValues['open'];
         set_tasks(data)
      })

      // UNSUBSCRIBE FROM TASK FEED ON UNMOUNT
      return () => { feed.unsubscribe() }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tasks' }>
         <div id={ 'inner' }>
            <Info
               header={ 'Task Manager' }
               data={{
                  'Contract': state.contracts.managers.task._address,
                  'Token Fee': fee
               }}
            />
            <List
               header={ 'Incomplete tasks' }
               data={ tasks }
               fallback={ 'No tasks found.' }
               category={ 'tasks' }
            />
            <Actions
               state={ state }
               dispatch={ dispatch }
            />
         </div>
      </div>
   )
}

export default Tasks;