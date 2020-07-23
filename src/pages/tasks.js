import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function Tasks() {
   
   // state STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {

      // RESET PAGE HEADER
      dispatch({
         type: 'header',
         payload: 'Tasks'
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