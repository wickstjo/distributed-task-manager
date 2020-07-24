import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';

function Task({ match }) {

   // state STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'task'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tasks' }>
         <div id={ 'inner' }>Tasks - { match.params.address }</div>
      </div>
   )
}

export default Task;