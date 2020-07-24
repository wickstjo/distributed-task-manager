import React from 'react';
import Row from './row';

// TASK LAYOUT DECIDER
function List({ tasks }) {
   switch(tasks.length) {

      // NO TASKS FOUND
      case 0: { return (
         <div id={ 'fallback' }>No open tasks found.</div>
      )}

      // OTHERWISE, LOOP OUT TASKS
      default: { return (
         tasks.map((data, index) =>
            <Row
                data={ data }
                key={ index }
            />
         )
      )}
   }
}

export default List;