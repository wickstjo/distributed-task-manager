import React, { useContext } from 'react';
import { Context } from '../assets/context';
import Item from './menu/item';
import '../interface/css/menu.scss';

function Menu() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   return (
      <div id={ 'menu' }>
         <div className={ 'inner' }>
            <Item
               name={ 'Tasks' }
               to={ '/' }
               current={ state.header }
            />
            <Item
               name={ 'Tokens' }
               to={ '/tokens' }
               current={ state.header }
            />
            <Item
               name={ 'Profile' }
               to={ '/users/' + state.keys.public }
               current={ state.header }
            />
            <Item
               name={ 'Whisper' }
               to={ '/whisper' }
               current={ state.header }
            />
            <Item
               name={ 'Settings' }
               to={ '/settings' }
               current={ state.header }
            />
         </div>
      </div>
   )
}

export default Menu;