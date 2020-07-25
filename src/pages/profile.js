import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';
import Actions from '../components/profile/actions';

function Profile({ match }) {

   // state STATE
   const { state, dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: match.params.address === state.keys.public ? 'profile' : 'user'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'users' }>
         <div id={ 'inner' }>
            <div id={ 'fallback' }>Users - { match.params.address }</div>
            {
               match.params.address === state.keys.public ? <Actions dispatch={ dispatch } /> : null
            }
         </div>
      </div>
   )
}

export default Profile;