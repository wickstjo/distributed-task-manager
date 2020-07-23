import React, { useContext } from 'react';
import { Context } from "../../assets/context";

function Task() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   return (
      <div id={ 'task' }>
         <div id={ 'top' }>Create Task</div>
         <div id={ 'content' }>{ state.header }</div>
      </div>
   )
}

export default Task;