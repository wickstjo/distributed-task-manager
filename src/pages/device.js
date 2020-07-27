import React, { useContext, useEffect } from 'react';
import { Context } from '../assets/context';
import Info from '../components/shared/info';
import List from '../components/shared/list';

function Device({ match }) {

   // state STATE
   const { dispatch } = useContext(Context)

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'device'
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'devices' }>
         <div id={ 'inner' }>
            <div id={ 'device' }>
            <div id={ 'header' }>Device overview</div>
               <Info
                  data={{
                     'Contract': 'TBA',
                     'Hash': match.params.address,
                     'Owner': 'TBA',
                     'Whisper Signature': 'TBA',
                     'Active': 'TBA',
                     'Tasks Completed': 'TBA'

                  }}
               />
               <div id={ 'header' }>Task backlog</div>
               <List
                  data={[]}
                  fallback={ 'No tasks found.' }
               />
            </div>
         </div>
      </div>
   )
}

export default Device;