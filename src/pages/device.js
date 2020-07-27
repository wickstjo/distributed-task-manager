import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import Info from '../components/shared/info';
import List from '../components/shared/list';
import { fetch, backlog as get_backlog } from '../funcs/contract/device';

function Device({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [contract, set_contract] = useState('')
   const [backlog, set_backlog] = useState([])

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
                     'Owner': 'TBA',
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
         </div>
      </div>
   )
}

export default Device;