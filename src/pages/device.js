import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import Info from '../components/shared/info';
import List from '../components/shared/list';
import { fetch, backlog as get_backlog, owner as get_owner } from '../funcs/contract/device';
import Actions from '../components/device/actions';
import { Link } from 'react-router-dom';

function Device({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [contract, set_contract] = useState('')
   const [backlog, set_backlog] = useState([])
   const [owner, set_owner] = useState('')

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'device'
      })

      // FETCH THE DEVICE CONTRACT
      fetch(match.params.address, state).then(address => {
         set_contract(address)
      })

      // FETCH DEVICE BACKLOG
      get_backlog(match.params.address, state).then(data => {
         set_backlog(data)
      })

      // FETCH DEVICE OWNER
      get_owner(match.params.address, state).then(foo => {
         set_owner(foo)
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'devices' }>
         <div id={ 'inner' }>
            <div id={ 'device' }>
            <div id={ 'header' }>Device overview</div>
               <Info
                  data={{
                     'Contract': contract,
                     'Hash': match.params.address,
                     'Owner': <Link to={ '/users/' + owner }>{ owner }</Link>,
                     'Whisper Signature': 'TBA',
                     'Active': 'TBA',
                     'Tasks Completed': 'TBA'
                  }}
               />
               <div id={ 'header' }>Task backlog</div>
               <List
                  data={ backlog }
                  fallback={ 'No tasks found.' }
                  category={ '/tasks' }
               />
            </div>
            <Actions
               state={ state }
               dispatch={ dispatch }
               hash={ match.params.address }
            />
         </div>
      </div>
   )
}

export default Device;