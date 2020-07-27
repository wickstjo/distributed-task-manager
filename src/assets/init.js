import { useContext, useEffect } from 'react';
import { Context } from "./context";
import { sleep } from '../funcs/misc';
import { init as init_blockchain } from '../funcs/blockchain';
import { init as init_whisper, create_feed } from '../funcs/whisper';
import { fetch } from '../funcs/contract/user';

function Init() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // ON INITIAL PAGE LOAD
   useEffect(() => {

      // INIT WHISPER DATA
      init_whisper(state).then(whisper_data => {

         // INIT BLOCKCHAIN DATA
         const blockchain_data = init_blockchain(state);

         // SET BOTH IN STATE
         dispatch({
            type: 'init',
            payload: {
               ...whisper_data,
               ...blockchain_data
            }
         })

         // SLEEP FOR ABIT, THEN HIDE LOADING SCREEN
         sleep(2000).then(() => {
            dispatch({
               type: 'hide-prompt'
            })
         })

         // TURN OFF METAMASK WARNING
         if (window.ethereum !== undefined) {
            window.ethereum.autoRefreshOnNetworkChange = false;
         }
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // CREATE WHISPER MESSAGE FEED
   useEffect(() => {
      create_feed(state, dispatch)

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.whisper.topic])

   // CHECK IF USER WALLET IS REGISTERED
   useEffect(() => {
      if (state.web3 !== null) {

         // FETCH USER SMART CONTRACT
         fetch(state).then(result => {

            // VERYIFY LEGITIMICY IN STATE
            dispatch({
               type: 'verify',
               payload: result
            })
         })
      }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.web3])

   return null;
}

export default Init;