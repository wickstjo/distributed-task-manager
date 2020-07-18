import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from "./assets/context";
import './interface/css/general.scss';

import Init from './assets/init';
import Header from './assets/header';
import Pages from './assets/pages';

function App() { return (
   <HashRouter>
      <Provider>
         <Init />
         <div id={ 'wrapper' }>
            <Header />
            <Pages />
         </div>
      </Provider>
   </HashRouter>
)}

export default App;