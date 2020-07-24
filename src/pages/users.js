import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function Users() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'users'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'users' }>
         <div id={ 'inner' }>Users</div>
      </div>
   )
}

export default Users;