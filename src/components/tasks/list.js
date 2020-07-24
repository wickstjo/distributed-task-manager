import React from 'react';
import Row from './row';

// TASK LAYOUT DECIDER
function List({ data, fallback }) {
   switch(data.length) {

      // NO TASKS FOUND
      case 0: { return (
         <div id={ 'fallback' }>{ fallback }</div>
      )}

      // OTHERWISE, LOOP OUT TASKS
      default: { return (
         <div id={ 'list' }>
            { data.map((value, index) =>
               <Row
                  value={ value }
                  category={ 'tasks' }
                  key={ index }
               />
            )}
         </div>
      )}
   }
}

export default List;