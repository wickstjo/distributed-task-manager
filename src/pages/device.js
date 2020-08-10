import React, { useContext, useEffect, useReducer } from 'react';
import { Context } from '../assets/context';
import Info from '../components/shared/info';
import List from '../components/shared/list';
import { details, changes } from '../funcs/contract/device';
import Actions from '../components/actions/device';
import { reducer } from '../components/shared/reducer';
import { Link } from 'react-router-dom';

function Device({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      contract: '',
      backlog: [],
      owner: ''
   })

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'device'
      })

      // FETCH THE DEVICE CONTRACT DETAILS
      details(match.params.address, state).then(response => {
         set_local({
            type: 'all',
            payload: response
         })
      })

      // DEVICE COLLECTION FEED PH
      let feed = null;

      // SUBSCRIBE TO CHANGES IN CONTRACT
      changes(match.params.address, set_local, state).then(blob => {
         feed = blob
      })

      // UNSUBSCRIBE ON UNMOUNT
      return () => { feed.unsubscribe(); }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'devices' }>
         <div id={ 'inner' }>
            <div id={ 'device' }>
               <Info
                  header={ 'Device overview' }
                  data={{
                     'Contract': local.contract,
                     'Hash': match.params.address,
                     'Owner': <Link to={ '/users/' + local.owner }>{ local.owner }</Link>,
                     'Active': local.active,
                     'Discoverable': local.discoverable,
                     'Tasks Completed': local.completed
                  }}
               />
               <Info
                  header={ 'Discovery tags' }
                  fallback={ 'No tags found' }
                  data={{}}
               />
               <List
                  header={ 'Task backlog (' + local.backlog.length + ')' }
                  data={ local.backlog }
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