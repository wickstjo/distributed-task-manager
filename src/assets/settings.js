import React, { useContext } from 'react';
import { Context } from "./context";
import '../interface/css/settings.scss';

function Settings() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   return (
      <div id={ 'settings' }>
         <div id={ 'top' }>Topic encryption key</div>
         <div id={ 'content' }>{ state.keys.sym }</div>
         <div id={ 'top' }>Identification hash</div>
         <div id={ 'content' }>{ state.keys.id }</div>
      </div>
   )
}

export default Settings;