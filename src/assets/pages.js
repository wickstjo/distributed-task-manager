import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from './context';

import Tasks from '../pages/tasks';
import Devices from '../pages/devices';
import Whisper from '../pages/whisper';
import Settings from '../pages/settings';
import Error from '../pages/error';

function Pages() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // IF WHISPER HAS BEEN SET, LOAD
   if (state.shh !== null) { return (
      <Switch>
         <Route exact path={ '/' } component={ Tasks } />
         <Route path={ '/devices' } component={ Devices } />
         <Route path={ '/whisper' } component={ Whisper } />
         <Route path={ '/settings' } component={ Settings } />
         <Route component={ Error } />
      </Switch>

   // OTHERWISE, RENDER NOTHING
   )} else { return null; }
}

export default Pages;