import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "./assets/context";
import './interface/css/general.scss';

import Init from './assets/init';
import Pages from './assets/pages';

function App() { return (
   <BrowserRouter>
      <Provider>
         <Init />
         <div id={ 'wrapper' }>
            <Pages />
         </div>
      </Provider>
   </BrowserRouter>
)}

export default App;