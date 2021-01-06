import React, { useContext } from 'react';
import { Context } from './context';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../interface/css/innerbody.scss';

import Tasks from '../pages/tasks';
import Task from '../pages/task';
import Result from '../pages/result';

import Services from '../pages/services';
import Service from '../pages/service';

import Device from '../pages/device';
import User from '../pages/user';

import Tokens from '../pages/tokens';
import Whisper from '../pages/whisper';
import Settings from '../pages/settings';
import Error from '../pages/error';

export default () => {

    // GLOBAL STATE
    const { state } = useContext(Context);

    // IF WHISPER & WEB3 CONNECTIONS HAVE BEEN ESTABLISHED
    if (state.initialized) { return (

        <div id={ 'innerbody' }>
            <Switch>
                <Route exact path="/" component={() => <Redirect to={ '/tasks' } /> } />

                <Route exact path={ '/tasks' } component={ Tasks } />
                <Route path={ '/tasks/:address' } component={ Task } />
                <Route path={ '/results/:address' } component={ Result } />

                <Route exact path={ '/services' } component={ Services } />
                <Route path={ '/services/:name' } component={ Service } />

                <Route path={ '/devices/:address' } component={ Device } />
                <Route path={ '/users/:address' } component={ User } />

                <Route exact path={ '/tokens' } component={ Tokens } />
                <Route exact path={ '/whisper' } component={ Whisper } />
                <Route exact path={ '/settings' } component={ Settings } />
                <Route component={ Error } />
            </Switch>
        </div>

    // OTHERWISE, RENDER NOTHING
    )} else { return null }
}