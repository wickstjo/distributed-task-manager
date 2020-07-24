import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function Devices() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'devices'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'devices' }>
         <div id={ 'inner' }>Devices</div>
      </div>
   )
}

export default Devices;