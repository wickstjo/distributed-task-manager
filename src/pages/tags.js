import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Context } from '../assets/context';
import List from '../components/shared/list';
import Info from '../components/shared/info';
import { tags as fetch_tags, added } from '../funcs/contract/tag';

function Tasks() {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATES
   const [tags, set_tags] = useState([])

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'tags'
      })

      // FETCH TRANSPILER
      fetch_tags(state).then(response => {
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
            header={ 'Tag Manager' }
            data={{
               'Contract': state.contracts.managers.tag._address
            }}
         />
         <List
            header={ 'Standardized Tags' }
            data={ tags }
            fallback={ 'No tags found.' }
            category={ 'tags' }
         />
      </Fragment>
   )
}

export default Tasks;