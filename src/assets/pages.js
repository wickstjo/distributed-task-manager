import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Context } from './context';

import Tasks from '../pages/tasks';
import Task from '../pages/task';

import Tags from '../pages/tags';
import Tag from '../pages/tag';

import Device from '../pages/device';
import User from '../pages/profile';

import Tokens from '../pages/tokens';
import Whisper from '../pages/whisper';
import Settings from '../pages/settings';
import Error from '../pages/error';

function Pages() {

   // GLOBAL STATE
   const { state } = useContext(Context);

   // IF WHISPER & WEB3 CONNECTIONS HAVE BEEN ESTABLISHED
   if (state.shh !== null && state.web3 !== null) { return (
      <Switch>
         <Route exact path="/" component={() => <Redirect to={ '/tasks' } /> } />

         <Route exact path={ '/tasks' } component={ Tasks } />
         <Route path={ '/tasks/:address' } component={ Task } />

         <Route exact path={ '/tags' } component={ Tags } />
         <Route path={ '/tags/:name' } component={ Tag } />

         <Route path={ '/devices/:address' } component={ Device } />
         <Route path={ '/users/:address' } component={ User } />

         <Route exact path={ '/tokens' } component={ Tokens } />
         <Route exact path={ '/whisper' } component={ Whisper } />
         <Route exact path={ '/settings' } component={ Settings } />
         <Route component={ Error } />
      </Switch>

   // OTHERWISE, RENDER NOTHING
   )} else { return null; }
}

export default Pages;