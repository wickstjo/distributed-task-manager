import { useContext, useEffect } from 'react';
import { Context } from "./context";
import { sleep } from '../funcs/misc';
import { init as init_blockchain } from '../funcs/blockchain';
import { init as init_whisper, create_feed } from '../funcs/whisper';
import { fetch } from '../funcs/contract/user';
import { shorten, to_date } from '../funcs/chat';
import { decode } from '../funcs/process';

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
      if (state.whisper.utils !== null) {

         // ON MESSAGE..
         create_feed(response => {
     
            // RENDER IT TO THE WHISPER PAGE
            dispatch({
               type: 'message',
               payload: {
                  user: shorten(response.sig, 4),
                  msg: state.whisper.utils.to_string(response.payload),
                  timestamp: to_date(response.timestamp)
               }
            })
         }, state, dispatch)
      }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.whisper.topic])

   // COLLECT DEVICE QUERY RESPONSES
   useEffect(() => {
      if (state.query.active) {
        
         // SELECT THE LAST SUBMITTED MESSAGE
         const last = state.whisper.messages[state.whisper.messages.length - 1].msg

         // ATTEMPT TO DECODE THE MESSAGE
         const decoded = decode(last)

         // IF IT IS A RESPONSE & THE ID MATCHES THE QUERY
         if (decoded.type === 'response' && decoded.source === state.query.id) {

            // ADD QUERY RESPONSE
            dispatch({
               type: 'query-response',
               payload: decoded.device
            })

            // ALERT WITH MESSAGE
            dispatch({
               type: 'alert',
               payload: {
                  type: 'good',
                  text: 'a device has responded'
               }
            })
         }
      }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.whisper.messages])
 
   // CHECK IF USER WALLET IS REGISTERED
   useEffect(() => {
      if (state.web3 !== null) {

         // FETCH USER SMART CONTRACT
         fetch(state.keys.public, state).then(result => {

            // VERYIFY LEGITIMICY IN STATE
            dispatch({
               type: 'verify',
               payload: result
            })

            // ALERT WITH MESSAGE
            dispatch({
               type: 'alert',
               payload: {
                  text: 'you have been autologged in',
                  type: 'good'
               }
            })
         })
      }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state.web3])

   return null;
}

export default Init;