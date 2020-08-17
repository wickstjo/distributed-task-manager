import React, { useContext, useEffect, useReducer, Fragment } from 'react';
import { Context } from '../assets/context';
import { result } from '../funcs/contract/task';
import { reducer } from '../components/shared/reducer';

import Info from '../components/shared/info';

function Result({ match }) {

   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATE
   const [local, set_local] = useReducer(reducer, {
      ipfs: '',
      key: ''
   })

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'result'
      })

      // FETCH THE DEVICE CONTRACT DETAILS
      result(match.params.address, state).then(response => {
         set_local({
            type: 'all',
            payload: response
         })
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Fragment>
         <Info
            header={ 'Task Result' }
            data={{
               'Task Contract': match.params.address,
               'IPFS': local.ipfs,
               'Encryption Key': local.key
            }}
         />
      </Fragment>
   )
}

export default Result;