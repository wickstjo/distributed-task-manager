import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function Settings() {
   
   // state STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {

      // RESET PAGE HEADER
      dispatch({
         type: 'header',
         payload: 'settings'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   
   return (
      <div id={ 'settings' }>
         <div id={ 'inner' }>Settings</div>
      </div>
   )
}

export default Settings;