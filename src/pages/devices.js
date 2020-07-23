import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function Devices() {

   // state STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {

      // RESET PAGE HEADER
      dispatch({
         type: 'header',
         payload: 'Devices'
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