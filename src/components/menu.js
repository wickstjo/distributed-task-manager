import React, { useContext } from 'react';
import { Context } from '../assets/context';
import Item from './menu/item';
import '../interface/css/menu.scss';

function Menu() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   return (
      <div id={ 'menu' }>
         <div id={ 'inner' }>
            <Item
               name={ 'Tasks' }
               to={ '/' }
               current={ state.header }
            />
            <Item
               name={ 'Tags' }
               to={ '/tags' }
               current={ state.header }
            />
            <Item
               name={ 'Tokens' }
               to={ '/tokens' }
               current={ state.header }
            />
            {
               state.verified ? <Item
                  name={ 'Profile' }
                  to={ '/users/' + state.keys.public }
                  current={ state.header }
               /> : null
            }
            <Item
               name={ 'Whisper' }
               to={ '/whisper' }
               current={ state.header }
            />
         </div>
      </div>
   )
}

export default Menu;