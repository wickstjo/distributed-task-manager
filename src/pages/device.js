import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function Device({ match }) {

   // state STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'device'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'devices' }>
         <div id={ 'inner' }>Devices - { match.params.address }</div>
      </div>
   )
}

export default Device;