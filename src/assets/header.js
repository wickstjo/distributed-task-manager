import React, { useContext, useEffect, useState } from 'react';
import { Context } from './context';
import '../interface/css/header.scss';

function Header() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   const [local, set_local] = useState('')

   // CHECK WHAT TEXT TO RENDER
   useEffect(() => {
      if (state.topic === '') {
         set_local('None')
      } else {
         set_local(state.topic)
      }
   }, [state.topic])

   return (
      <div id="header"><div className="inner">
         <div className={ 'split' }>
            <div><li>Currency Viewed Topic:</li></div>
            <div><li>{ local }</li></div>
         </div>
      </div></div>
   )
}

export default Header;