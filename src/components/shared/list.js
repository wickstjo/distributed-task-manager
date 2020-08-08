import React, { Fragment } from 'react';
import Row from './row';

// TASK LAYOUT DECIDER
function List({ data, header, fallback, category }) {
   switch(data.length) {

      // NO TASKS FOUND
      case 0: { return (
         <Fragment>
            <div id={ 'header' }>{ header }</div>
            <div id={ 'container' }>
               <div id={ 'fallback' }>{ fallback }</div>
            </div>
         </Fragment>
      )}

      // OTHERWISE, LOOP OUT TASKS
      default: { return (
         <Fragment>
            <div id={ 'header' }>{ header }</div>
            <div id={ 'container' }>
               { data.map((value, index) =>
                  <Row
                     value={ value }
                     category={ category }
                     key={ index }
                  />
               )}
            </div>
         </Fragment>
      )}
   }
}

export default List;