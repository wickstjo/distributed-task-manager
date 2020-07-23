import React, { useContext } from 'react';
import { Context } from '../assets/context';
import Item from './menu/item';
import Extra from '../components/menu/extra';
import '../interface/css/menu.scss';

function Menu() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   return (
      <div id={ 'menu' }><div className={ 'inner' }>
         <div className={ 'split' }>
            <div>
               <Item
                  name={ 'Tasks' }
                  to={ '/' }
                  current={ state.header }
               />
               <Item
                  name={ 'Devices' }
                  to={ '/devices' }
                  current={ state.header }
               />
               <Item
                  name={ 'Users' }
                  to={ '/users' }
                  current={ state.header }
               />
               <Item
                  name={ 'Tokens' }
                  to={ '/tokens' }
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
            <div>
               <Extra
                  current={ state.header }
                  dispatch={ dispatch }
               />
            </div>
         </div>
      </div></div>
   )
}

export default Menu;