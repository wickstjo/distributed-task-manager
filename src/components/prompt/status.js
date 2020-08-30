import React, { useContext, Fragment } from 'react';
import { Context } from '../../assets/context';
import { toggle_active, toggle_discovery } from '../../funcs/contract/device';

import Header from './header';
import Button from '../input/button';

function Status() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // TOGGLE DISCOVERY
   function active() {
      toggle_active(() => {

         // SUCCESS MESSAGE
         return 'device active status changed'

      }, state.trigger, state, dispatch)
   }

   // TOGGLE DISCOVERY
   function discovery() {
      toggle_discovery(() => {

         // SUCCESS MESSAGE
         return 'device discovery status changed'

      }, state.trigger, state, dispatch)
   }

   return (
      <Fragment>
         <Header text={ 'Toggle Device Status' } />
         <Button
            value={ 'Toggle Active Status' }
            fallback={ 'None' }
            execute={ active }
            required={[]}
         />
         <Button
            value={ 'Toggle Discovery Status' }
            fallback={ 'None' }
            execute={ discovery }
            required={[]}
         />
      </Fragment>
   )
}

export default Status;