import React, { useContext, useEffect } from 'react';
import { Context } from "../assets/context";
import { sleep } from "../funcs/misc";
import '../interface/css/prompt.scss';
import EventListener from 'react-event-listener';

import Device from './prompt/device';
import Task from './prompt/task';
import Token from './prompt/token';
import Service from './prompt/service';
import Config from './prompt/config';
import Status from './prompt/status';
import AddService from './prompt/add_service';
import RemoveService from './prompt/remove_service';

// PROMPT CONTAINER
function Prompt() {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // TOGGLE VISIBILITY BASED ON STATE
   useEffect(() => {
      if (state.prompt.visible) {
         document.getElementById('prompt').style.display = 'flex';
         sleep(100).then(() => {
            document.getElementById('wrapper').style.filter = 'blur(6px)';
            document.getElementById('prompt').style.opacity = 1;
         })
      } else {
         document.getElementById('prompt').style.opacity = 0;
         document.getElementById('wrapper').style.filter = 'none';
         sleep(100).then(() => {
            document.getElementById('prompt').style.display = 'none';
         })
      }
   }, [state.prompt.visible]);

   // CLOSE PROMPT ON ESC KEY
   function key_event(event) {
      if (state.prompt.visible && event.code === 'Escape') {
         dispatch({ type: 'hide-prompt' })
      }
   }

   return (
      <div id={ 'prompt' }>
         <div id={ 'inner' }>
            <Content
               type={ state.prompt.type }
            />
            <EventListener
               target={ document }
               onKeyDown={ key_event }
            />
            <span
               id="close"
               onClick={() => { dispatch({ type: 'hide-prompt' }) }}
            />
         </div>
      </div>
   )
}

// PROMPT CONTENT
function Content({ type }) {
   switch(type) {

      // LOADING
      case 'loading': {
         return <div className="lds-dual-ring" />
      }

      // CREATE TASK
      case 'task': {
         return <Task />
      }

      // REGISTER DEVICE
      case 'device': {
         return <Device />
      }

      // UPDATE DEVICE DISCOVERY CONFIG
      case 'tag-config': {
         return <Config />
      }

      // TOGGLE DEVICE STATUS
      case 'status': {
         return <Status />
      }

      // ADD SERVICE TO DEVICE
      case 'add-service': {
         return <AddService />
      }

      // UPDATE SERVICE FROM DEVICE
      case 'remove-service': {
         return <RemoveService />
      }

      // PURCHASE TOKEN
      case 'token': {
         return <Token />
      }

      // ADD TAG
      case 'create-service': {
         return <Service />
      }

      // FALLBACK
      default: {
         return <div>Prompt type error</div>
      }
   }
}

export default Prompt;