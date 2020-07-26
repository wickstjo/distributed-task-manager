import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import Actions from '../components/profile/actions';
import List from '../components/tasks/list';
import '../interface/css/profile.scss';
import { collection } from '../funcs/contract/device';

function Profile({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [devices, set_devices] = useState([])

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

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'users' }>
         <div id={ 'inner' }>
            <div id={ 'profile' }>
               <div id={ 'header' }>Profile overview</div>
               <div id={ 'header' }>Device collection</div>
               <List
                  data={ devices }
                  fallback={ 'foobar' }
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