import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function Tasks() {
   
   // state STATE
   const { state, dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {

      console.log(state)

      // RESET PAGE HEADER
      dispatch({
         type: 'header',
         payload: 'tasks'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tasks' }>
         <div id={ 'inner' }>Tasks</div>
      </div>
   )
}

export default Tasks;