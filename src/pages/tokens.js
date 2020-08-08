import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import Info from '../components/shared/info';
import Actions from '../components/tokens/actions';
import { price as get_price } from '../funcs/contract/token';

function Tokens() {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [price, set_price] = useState('')

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'tokens'
      })

      // FETCH TOKEN PRICE
      get_price(state).then(amount => {
         set_price(amount)
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tokens' }>
         <div id={ 'inner' }>
            <Info
               header={ 'Token Manager' }
               data={{
                  'Contract': state.contracts.managers.token._address,
                  'Symbol': 'PH',
                  'ETH Price': price + ' WEI',
                  'In Circulation': 'PH',
                  'Available': 'PH',
               }}
            />
            <Actions dispatch={ dispatch } />
         </div>
      </div>
   )
}

export default Tokens;