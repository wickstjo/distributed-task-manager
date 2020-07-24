import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function Tokens() {

   // state STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'tokens'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tokens' }>
         <div id={ 'inner' }>
            <div id={ 'fallback' }>Tokens page</div>
         </div>
      </div>
   )
}

export default Tokens;