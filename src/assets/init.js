import { useContext, useEffect } from 'react';
import { Context } from "./context";
import Web3 from 'web3';
import { gateways, whisper } from '../settings.json';
import { sleep } from '../funcs/misc';
import { shorten, to_date } from '../funcs/chat';

function Init() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context);

   // ON INITIAL PAGE LOAD
   useEffect(() => {

      // INSTANTIATE WEB3
      const web3 = new Web3('ws://' + gateways.blockchain.host + ':' + gateways.blockchain.port)

      // WAIT FOR PROMISES TO RESOLVE
      web3.shh.newKeyPair().then(identification => {
         
         // SET IN STATE
         dispatch({
            type: 'init',
            payload: {

               // SET WHISPER PARAMS
               shh: web3.shh,
               whisper: {
                  ...state.whisper,
                  topic: whisper.topic,
                  id: identification
               },

               // SET HEX UTILS
               utils: {
                  to_string: web3.utils.hexToString,
                  to_hex: web3.utils.stringToHex
               }
            }
         })

         sleep(2000).then(() => {
            dispatch({
               type: 'hide-prompt'
            })
         })

         // TURN OFF METAMASK WARNING
         if (window.ethereum !== undefined) {
            window.ethereum.autoRefreshOnNetworkChange = false;
         }
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // CREATE WHISPER MESSAGE FEED
   useEffect(() => {
      if (state.utils !== undefined) {

         // UNSUBSCRIBE FROM ANY EXISTING FEED
         if (state.whisper.feed !== null) {
            state.whisper.feed.unsubscribe()
         }

         // HEX TOPIC NAME
         const hexed_topic = state.utils.to_hex(state.whisper.topic.name)

         // CREATE A NEW ONE
         const temp = state.shh.subscribe('messages', {
            symKeyID: state.whisper.topic.id,
            topics: [hexed_topic]

         // ON MESSAGE, ADD IT
         }).on('data', response => {

            // PARSE MESSAGE PARAM & DERIVATE FIRST WORK
            const message = state.utils.to_string(response.payload)
            const first = message.split(' ')[0].toLowerCase();

            // SET MESSAGE TYPE BASED ON FIRST WORD
            dispatch({
               type: 'message',
               payload: {
                     user: shorten(response.sig, 4),
                     msg: message,
                     timestamp: to_date(response.timestamp),
                     type: first === '!request' ? 'request' : 'message'
               }
            })
         })

         // SET FEED IN STATE
         dispatch({
            type: 'feed',
            payload: temp
         })
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.whisper.topic])

   return null;
}

export default Init;