import React from 'react';

function Extra({ current, dispatch }) {
   switch(current.toLowerCase()) {

      // CREATE TASK MENU
      case 'tasks': { return (
         <li id={ 'item' } className={ 'extra' } onClick={() => {
            dispatch({
               type: 'show-prompt',
               payload: 'task'
            })
         }}>Create Task</li>
      )}

      // REGISTER DEVICE MENU
      case 'devices': { return (
         <li id={ 'item' } className={ 'extra' } onClick={() => {
            dispatch({
               type: 'show-prompt',
               payload: 'device'
            })
         }}>Register Device</li>
      )}

      // REGISTER DEVICE MENU
      case 'users': { return (
         <li id={ 'item' } className={ 'extra' } onClick={() => {
            dispatch({
               type: 'show-prompt',
               payload: 'user'
            })
         }}>Register Wallet</li>
      )}

      // FALLBACK
      default: { return null }
   }
}

export default Extra;