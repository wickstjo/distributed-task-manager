import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import Info from '../components/shared/info';
import { details as get_details } from '../funcs/contract/task';
import { Link } from 'react-router-dom';
import Actions from '../components/actions/task';

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
                  'Creator': <Link to={ '/users/' + details.creator }>{ details.creator }</Link>,
                  'Assigned Device': <Link to={ '/devices/' + details.device }>{ details.device }</Link>,
                  'Token Reward': details.reward,
                  'Block Expiration': details.expires,
               }}
            />
            <Actions
               state={ state }
               dispatch={ dispatch }
            />
         </div>
      </div>
   )
}

export default Task;