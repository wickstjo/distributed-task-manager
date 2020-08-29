import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from "./assets/context";

import './interface/css/general.scss';
import './interface/css/menu.scss';
import './interface/css/main.scss';
import './interface/css/actions.scss';
import './interface/css/whisper.scss';
import './interface/css/prompt.scss';

import Init from './assets/init';
import Pages from './assets/pages';
import Menu from './components/menu';
import Prompt from './components/prompt';
import Actions from './components/actions';
import Redirect from './components/redirect';
import Alerts from './components/alerts';

function App() { return (
   <HashRouter>
      <Provider>
         <Init />
         <div id={ 'wrapper' }>
            <Menu />
            <div id={ 'main' }>
               <div id={ 'inner' }>
                  <Pages />
               </div>
               <Alerts />
            </div>
            <Actions />
         </div>
         <Prompt />
         <Redirect />
      </Provider>
   </HashRouter>
)}

export default App;