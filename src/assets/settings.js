import React, { useContext } from 'react';
import { Context } from "./context";
import '../interface/css/settings.scss';

function Settings() {

   // ROUTE CONTEXT
   const { state, dispatch } = useContext(Context);

   return (
      <div id={ 'settings' }>
         <div id={ 'top' }>Topic encryption key</div>
         <textarea
            type={ 'text' }
            value={ state.keys.sym }
            onChange={ event => {
               dispatch({
                  type: 'update-sym',
                  payload: event.target.value
               })
            }}
         />
         <div id={ 'top' }>Identification hash</div>
         <textarea
            type={ 'text' }
            value={ state.keys.id }
            onChange={ event => {
               dispatch({
                  type: 'update-id',
                  payload: event.target.value
               })
            }}
         />
      </div>
   )
}

export default Settings;