import React from 'react';

function Extra({ current, dispatch }) {
   switch(current) {

      // CREATE TASK MENU
      case 'Tasks': { return (
         <li id={ 'item' } className={ 'extra' } onClick={() => {
            dispatch({
               type: 'show-prompt',
               payload: 'task'
            })
         }}>Create Task</li>
      )}

      // REGISTER DEVICE MENU
      case 'Devices': { return (
         <li id={ 'item' } className={ 'extra' } onClick={() => {
            dispatch({
               type: 'show-prompt',
               payload: 'device'
            })
         }}>Register Device</li>
      )}

      // FALLBACK
      default: { return null }
   }
}

export default Extra;