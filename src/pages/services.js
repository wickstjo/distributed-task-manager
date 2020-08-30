import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Context } from '../assets/context';
import List from '../components/shared/list';
import Info from '../components/shared/info';
import { services, added } from '../funcs/contract/service';

function Services() {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATES
   const [tags, set_tags] = useState([])

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'services'
      })

      // FETCH TRANSPILER
      services(state).then(response => {
         set_tags(response)
      })

      // SUBSCRIBE TO TAGS ADDED FEED ON MOUNT
      const feed = added(state).on('data', response => {
         const data = response.returnValues['tags'];
         set_tags(data)
      })

      // UNSUBSCRIBE FROM TASK FEED ON UNMOUNT
      return () => { feed.unsubscribe() }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Fragment>
         <Info
            header={ 'Service Manager' }
            data={{
               'Contract': state.contracts.managers.service._address
            }}
         />
         <List
            header={ 'Standardized Tags' }
            data={ tags }
            fallback={ 'No tags found.' }
            category={ 'services' }
         />
      </Fragment>
   )
}

export default Services;