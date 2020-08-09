import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import List from '../components/shared/list';
import Info from '../components/shared/info';
import { tags as fetch_tags } from '../funcs/contract/tag';
import '../interface/css/tasks.scss';
import Actions from '../components/tag/actions';

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

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tags' }>
         <div id={ 'inner' }>
            <Info
               header={ 'Tag Manager' }
               data={{
                  'Contract': state.contracts.managers.tag._address
               }}
            />
            <List
               header={ 'Standardized Tags (' + tags.length + ')' }
               data={ tags }
               fallback={ 'No tags found.' }
               category={ 'tasks' }
            />
            <Actions dispatch={ dispatch } />
         </div>
      </div>
   )
}

export default Tasks;