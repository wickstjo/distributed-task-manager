import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from './context';

import Home from '../pages/home';
import Settings from '../pages/settings';
import Error from '../pages/error';

function Pages() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // IF WHISPER HAS BEEN SET, LOAD
   if (state.shh !== null) { return (
      <Switch>
         <Route exact path={ '/' } component={ Home } />
         <Route path={ '/settings' } component={ Settings } />
         <Route component={ Error } />
      </Switch>

   // OTHERWISE, RENDER NOTHING
   )} else { return null; }
}

export default Pages;