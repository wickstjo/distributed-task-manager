import React, { useContext, useEffect } from 'react';
import { Context } from "./context";
import { sleep } from "../funcs/misc";
import '../interface/css/prompt.scss';
import Settings from './settings';

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
         });
      } else {
         document.getElementById('prompt').style.opacity = 0;
         document.getElementById('wrapper').style.filter = null;
         sleep(100).then(() => {
            document.getElementById('prompt').style.display = 'none';
         });
      }
   }, [state.prompt.visible]);

   return (
      <div id={ 'prompt' }>
         <div id={ 'inner' }>
            <Content
               type={ state.prompt.type }
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

      // LOADING
      case 'settings': {
         return <Settings />
      }

      // FALLBACK
      default: {
         return <div>Prompt type error</div>
      }
   }
}

export default Prompt;