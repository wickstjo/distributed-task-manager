import React from 'react';
import { Link } from 'react-router-dom';

function Item({ name, to, current }) {
   switch(current.toLowerCase()) {

      // THIS IS THE CURRENT HEADER
      case name.toLowerCase(): { return (
         <div id={ 'item' } className={ 'active' } alt={ name.toLowerCase() }>
            <div id={ 'inner' }>{ name }</div>
         </div>
      )}

      // NOT THE CURRENT HEADER
      default: { return (
         <Link to={ to }>
            <div id={ 'item' } className={ 'inactive' } alt={ name.toLowerCase() }>
               <div id={ 'inner' }>{ name }</div>
            </div>
         </Link>
      )}
   }
}

export default Item;