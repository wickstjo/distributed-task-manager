import React from 'react';
import Row from './row';

// TASK LAYOUT DECIDER
function List({ data, fallback, category }) {
   switch(data.length) {

      // NO TASKS FOUND
      case 0: { return (
         <div id={ 'container' }>
            <div id={ 'fallback' }>{ fallback }</div>
         </div>
      )}

      // OTHERWISE, LOOP OUT TASKS
      default: { return (
         <div id={ 'container' }>
            { data.map((value, index) =>
               <Row
                  value={ value }
                  category={ category }
                  key={ index }
               />
            )}
         </div>
      )}
   }
}

export default List;