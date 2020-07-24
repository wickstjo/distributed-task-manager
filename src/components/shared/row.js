import React from 'react';
import { Link } from 'react-router-dom';

// TASK CONTAINER
function Row({ value, category }) { return (
   <Link to={ category + '/' + value }>
      <div id={ 'row' }>{ value }</div>
   </Link>
)}

export default Row;