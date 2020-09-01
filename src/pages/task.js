import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Context } from '../assets/context';
import { details as get_details } from '../funcs/contract/task';
import { Link } from 'react-router-dom';
import { separator } from '../funcs/format';

import Info from '../components/shared/info';

function Task({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [details, set_details] = useState({
      creator: '',
      device: '',
      service: '',
      reward: '',
      encryption: '',
      expires: ''
   })

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'task'
      })

      // SET TRIGGER
      dispatch({
         type: 'trigger',
         payload: match.params.address
      })

      // FETCH TASK DETAILS
      get_details(match.params.address, state).then(response => {
         set_details(response)
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Fragment>
         <Info
            header={ 'Task Overview' }
            data={{
               'Contract': match.params.address,
               'Creator': <Link to={ '/users/' + details.creator }>{ details.creator }</Link>,
               'Assigned Device': <Link to={ '/devices/' + details.device }>{ details.device }</Link>,
               'Service': <Link to={ '/services/' + details.service }>{ details.service }</Link>,
               'Encryption Key': details.encryption,
               'Token Reward': separator(details.reward),
               'Block Expiration': separator(details.expires)
            }}
         />
      </Fragment>
   )
}

export default Task;