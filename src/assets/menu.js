import React from 'react';
import '../interface/css/menu.scss';
import Main from '../components/menu/main';

function Menu() { return (
   <div id="menu"><div className="inner">
      <Main header={ 'Messages' } link={ '/' } />
      <Main header={ 'Settings' } link={ '/settings' } />
   </div></div>
)}

export default Menu;