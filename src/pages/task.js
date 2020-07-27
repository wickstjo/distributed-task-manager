import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import Info from '../components/shared/info';
import { details as get_details } from '../funcs/contract/task';

function Task({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [details, set_details] = useState({
      creator: '',
      device: '',
      reward: '',
      expires: ''
   })

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'task'
      })

      // FETCH TASK DETAILS
      get_details(match.params.address, state).then(response => {
         set_details(response)
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tasks' }>
         <div id={ 'inner' }>
            <div id={ 'header' }>Task Overview</div>
            <Info
               data={{
                  'Contract': match.params.address,
                  'Creator': details.creator,
                  'Assigned Device': details.device,
                  'Token Reward': details.reward,
                  'Block Expiration': details.expires,
               }}
            />
         </div>
      </div>
   )
}

export default Task;