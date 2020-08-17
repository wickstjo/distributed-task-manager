import React, { Fragment } from 'react';
import { filter_zeros } from '../../funcs/format';

import Row from './row';

// TASK LAYOUT DECIDER
function List({ data, header, show_number = false, fallback, category }) {

   // FILTER AWAY NULLIFIED VALUES
   const filtered = filter_zeros(data)

   switch(filtered.length) {

      // NO TASKS FOUND
      case 0: { return (
         <Fragment>
            <div id={ 'header' }>{ header } ({ filtered.length })</div>
            <div id={ 'container' }>
               <div id={ 'fallback' }>{ fallback }</div>
            </div>
         </Fragment>
      )}

      // OTHERWISE, LOOP OUT TASKS
      default: { return (
         <Fragment>
            <div id={ 'header' }>{ header } ({ filtered.length })</div>
            <div id={ 'container' }>
               { filtered.map((value, index) =>
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