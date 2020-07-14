import { useContext, useEffect } from 'react';
import { Context } from "./context";

function Init() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // ON INITIAL PAGE LOAD
   useEffect(() => {
      dispatch({
         type: 'init'
      })
   }, [])

   return null;
}

export default Init;