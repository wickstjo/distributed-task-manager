import React, { useContext } from 'react';
import { Context } from "./context";
import '../interface/css/settings.scss';

function Settings() {

   // ROUTE CONTEXT
   const { state } = useContext(Context);

   return (
      <div id={ 'settings' }>
         <div id={ 'top' }>Topic encryption key</div>
         <textarea
            type={ 'text' }
            value={ state.keys.sym }
         />
         <div id={ 'top' }>Identification hash</div>
         <textarea
            type={ 'text' }
            value={ state.keys.id }
         />
      </div>
   )
}

export default Settings;