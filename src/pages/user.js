import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function User({ match }) {

   // state STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {

      // RESET PAGE HEADER
      dispatch({
         type: 'header',
         payload: 'users'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'users' }>
         <div id={ 'inner' }>{ match.params.address }</div>
      </div>
   )
}

export default User;