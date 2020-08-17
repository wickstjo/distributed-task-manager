import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import { details as get_details } from '../funcs/contract/task';
import { Link } from 'react-router-dom';
import { separator, filter_zeros } from '../funcs/format';

import Info from '../components/shared/info';
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
            <Info
               header={ 'Task Overview' }
               data={{
                  'Contract': match.params.address,
                  'Creator': <Link to={ '/users/' + details.creator }>{ details.creator }</Link>,
                  'Assigned Device': <Link to={ '/devices/' + details.device }>{ details.device }</Link>,
                  'Token Reward': separator(details.reward),
                  'Block Expiration': separator(details.expires)
               }}
            />
            <Actions
               state={ state }
               dispatch={ dispatch }
               source={ match.params.address }
            />
         </div>
      </div>
   )
}

export default Task;