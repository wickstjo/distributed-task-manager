import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';
import Actions from '../components/tokens/actions';

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
            <Actions dispatch={ dispatch } />
         </div>
      </div>
   )
}

export default Tokens;