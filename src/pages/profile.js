import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import Actions from '../components/profile/actions';
import List from '../components/shared/list';
import Info from '../components/shared/info';
import { collection } from '../funcs/contract/device';
import { fetch } from '../funcs/contract/user';
import { balance } from '../funcs/contract/token';

function Profile({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [devices, set_devices] = useState([])
   const [contract, set_contract] = useState('')
   const [tokens, set_tokens] = useState('')

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: match.params.address === state.keys.public ? 'profile' : 'user'
      })

      // FETCH & SET DEVICE COLLECTION
      collection(state).then(list => {
         set_devices(list)
      })

      // FETCH & SET USER SMART CONTRACT LOCATION
      fetch(state).then(address => {
         set_contract(address)
      })

      // FETCH TOKEN BALANCE
      balance(state).then(amount => {
         set_tokens(amount)
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'users' }>
         <div id={ 'inner' }>
            <div id={ 'profile' }>
               <div id={ 'header' }>User overview</div>
               <Info
                  data={{
                     'Contract': contract,
                     'ETH Wallet': state.keys.public,
                     'Whisper Signature': 'TBA',
                     'Reputation': 'TBA',
                     'Token Balance': tokens
                  }}
               />
               <div id={ 'header' }>Device collection ({ devices.length })</div>
               <List
                  data={ devices }
                  fallback={ 'foobar' }
                  category={ '/devices' }
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