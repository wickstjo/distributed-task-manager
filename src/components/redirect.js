import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';
import { Redirect } from 'react-router-dom';

function Redir() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   useEffect(() => {
      if (!state.redirect.status) {
         dispatch({ type: 'reset-redirect' })
      }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.redirect.status])

   switch (state.redirect.status) {
      
      case true: { return (
         <Redirect to={ state.redirect.location } />
      )}

      default: {
         return null
      }
   }
}

export default Redir;