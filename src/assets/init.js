import { useContext, useEffect } from 'react';
import { Context } from "./context";
import Web3 from 'web3';
import { gateways, whisper } from '../settings.json';

function Init() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // ON INITIAL PAGE LOAD
   useEffect(() => {

      // INSTANTIATE WEB3
      const web3 = new Web3('ws://' + gateways.blockchain.host + ':' + gateways.blockchain.port)

      // KEY PROMISES
      const key_promises = [
         web3.shh.newSymKey(),
         web3.shh.newKeyPair()
      ]

      // WAIT FOR PROMISES TO RESOLVE
      Promise.all(key_promises).then(results => {
         
         // SET IN STATE
         dispatch({
            type: 'init',
            payload: {

               // SET WHISPER
               shh: web3.shh,

               // SET KEYS
               keys: {
                  sym: whisper.network,
                  id: results[1]
               },

               // SET HEX UTILS
               utils: {
                  to_string: web3.utils.hexToString,
                  to_hex: web3.utils.stringToHex
               }
            }
         })

         // TURN OFF METAMASK WARNING
         if (window.ethereum !== undefined) {
            window.ethereum.autoRefreshOnNetworkChange = false;
         }
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return null;
}

export default Init;