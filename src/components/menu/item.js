import React from 'react';
import { Link } from 'react-router-dom';

function Item({ name, to, current }) {
   switch(current.toLowerCase()) {

      // THIS IS THE CURRENT HEADER
      case name.toLowerCase(): { return (
         <li id={ 'item' } className={ 'inactive' }>
            { name }
         </li>
      )}

      // NOT THE CURRENT HEADER
      default: { return (
         <Link to={ to }>
            <li id={ 'item' } className={ 'active' }>
               { name }
            </li>
         </Link>
      )}
   }
}

export default Item;