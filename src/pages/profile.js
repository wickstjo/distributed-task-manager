import React, { useContext, useEffect, useReducer } from 'react';
import { Context } from '../assets/context';
import Actions from '../components/actions/profile';
import List from '../components/shared/list';
import Info from '../components/shared/info';
import { collection, device_added } from '../funcs/contract/device';
import { details, changes } from '../funcs/contract/user';
import { balance } from '../funcs/contract/token';
import { reducer } from '../components/shared/reducer';

function Profile({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      contract: '',
      tokens: 0,
      reputation: 0,
      devices: [],
      results: []
   })

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: match.params.address === state.keys.public ? 'profile' : 'user'
      })

      // FETCH & SET DEVICE COLLECTION
      collection(match.params.address, state).then(list => {
         set_local({
            type: 'specific',
            payload: {
               name: 'devices',
               data: list
            }
         })
      })
      
      // FETCH & SET TOKEN BALANCE
      balance(match.params.address, state).then(amount => {
         set_local({
            type: 'specific',
            payload: {
               name: 'tokens',
               data: amount
            }
         })
      })

      // FETCH & SET USER SMART CONTRACT LOCATION
      details(match.params.address, state).then(data => {
         set_local({
            type: 'partial',
            payload: data
         })
      })

      // PLACEHOLDER
      let user_feed = null;

      // SUBSCRIBE TO USER FEED
      changes(match.params.address, set_local, state).then(blob => {
         user_feed = blob;
      })

      // SUBSCRIBE TO DEVICE COLLECTION FEED ON MOUNT
      const device_feed = device_added(match.params.address, state).on('data', response => {

         // EXTRACT DATA
         const data = response.returnValues['collection']

         // UPDATE DEVICES
         set_local({
            type: 'update',
            payload: {
               name: 'devices',
               data: data
            }
         })
      })

      // UNSUBSCRIBE ON UNMOUNT
      return () => {
         user_feed.unsubscribe();
         device_feed.unsubscribe();
      }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'users' }>
         <div id={ 'inner' }>
            <div id={ 'profile' }>
               <Info
                  header={ 'User overview' }
                  data={{
                     'Contract': local.contract,
                     'ETH Wallet': state.keys.public,
                     'Reputation': local.reputation,
                     'Token Balance': local.tokens
                  }}
               />
               <List
                  header={ 'Device collection (' + local.devices.length + ')' }
                  data={ local.devices }
                  fallback={ 'No devices found.' }
                  category={ '/devices' }
               />
               <List
                  header={ 'Task Results (' + local.results.length + ')' }
                  data={ local.results }
                  fallback={ 'No results found.' }
                  category={ '/results' }
               />
            </div>
            {
               match.params.address === state.keys.public ? <Actions dispatch={ dispatch } /> : null
            }
         </div>
      </div>
   )
}

export default Profile;