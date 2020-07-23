import React, { useContext } from 'react';
import { Context } from "../../assets/context";

function Device() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   return (
      <div id={ 'device' }>
         <div id={ 'top' }>Register Device</div>
      <div id={ 'content' }>{ state.header }</div>
      </div>
   )
}

export default Device;