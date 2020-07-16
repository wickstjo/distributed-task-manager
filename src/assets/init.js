import { useContext, useEffect } from 'react';
import { Context } from "./context";
import Web3 from 'web3';
import { gateways } from '../settings.json';

function Init() {

   // GLOBAL STATE
   const { dispatch } = useContext(Context);

   // ON INITIAL PAGE LOAD
   useEffect(() => {

      // INSTANTIATE WEB3
      dispatch({
         type: 'init',
         payload: new Web3('ws://' + gateways.blockchain.host + ':' + gateways.blockchain.port)
      })

      // TURN OFF METAMASK WARNING
      if (window.ethereum !== undefined) {
         window.ethereum.autoRefreshOnNetworkChange = false;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return null;
}

export default Init;