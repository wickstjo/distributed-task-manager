import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from "./assets/context";
import './interface/css/general.scss';

import Init from './assets/init';
import Pages from './assets/pages';
import Menu from './components/menu';
import Prompt from './components/prompt';

function App() { return (
   <HashRouter>
      <Provider>
         <Init />
         <div id={ 'wrapper' }>
            <Menu />
            <Pages />
         </div>
         <Prompt />
      </Provider>
   </HashRouter>
)}

export default App;