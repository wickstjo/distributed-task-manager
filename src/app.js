import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "./assets/context";
import './interface/css/general.scss';

import Init from './assets/init';
import Header from './assets/header';
import Pages from './assets/pages';

function App() { return (
   <BrowserRouter>
      <Provider>
         <Init />
         <div id={ 'wrapper' }>
            <Header />
            <Pages />
         </div>
      </Provider>
   </BrowserRouter>
)}

export default App;