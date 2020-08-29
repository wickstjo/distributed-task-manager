import React, { useContext } from 'react';
import { Context } from '../assets/context';
import '../interface/css/alerts.scss';

import Message from './alerts/message';

function Alerts() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   return (
      <div id={ 'alerts' }>
         <div>
            { state.messages.map((item, index) =>
               <Message
                  item={ item }
                  key={ index }
               />
            )}
         </div>
      </div>
   )
}

export default Alerts;