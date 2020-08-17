import React, { useContext, Fragment } from 'react';
import { Context } from '../../assets/context';
import { toggle_active, toggle_discovery } from '../../funcs/contract/device';
import { sleep } from '../../funcs/misc';

import Header from './header';
import Button from '../input/button';

function Status() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // TOGGLE DISCOVERY
   function active() {

      // SHOW THE LOADING SCREEN
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // EXECUTE TOGGLE
      toggle_active(state.trigger, state).then(() => {

         // SLEEP FOR 2 SECONDS, THEN HIDE PROMPT
         sleep(2000).then(() => {
            dispatch({
               type: 'hide-prompt'
            })
         })
      })
   }

   // TOGGLE DISCOVERY
   function discovery() {

      // SHOW THE LOADING SCREEN
      dispatch({
         type: 'show-prompt',
         payload: 'loading'
      })

      // EXECUTE TOGGLE
      toggle_discovery(state).then(() => {

         // SLEEP FOR 2 SECONDS, THEN HIDE PROMPT
         sleep(2000).then(() => {
            dispatch({
               type: 'hide-prompt'
            })
         })
      })
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