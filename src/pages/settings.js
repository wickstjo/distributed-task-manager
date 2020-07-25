import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';
import Actions from '../components/settings/actions';

function Settings() {
   
   // GLOBAL STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'settings'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   
   return (
      <div id={ 'settings' }>
         <div id={ 'inner' }>
            <div id={ 'fallback' }>Settings page</div>
            <Actions dispatch={ dispatch } />
         </div>
      </div>
   )
}

export default Settings;