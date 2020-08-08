import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import List from '../components/shared/list';
import Info from '../components/shared/info';
import { formats as fetch_formats, transpiler as fetch_transpiler } from '../funcs/contract/tag';
import '../interface/css/tasks.scss';

function Tasks() {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATES
   const [formats, set_formats] = useState([])
   const [transpiler, set_transpiler] = useState('')
   const [standard, set_standard] = useState([])
   const [custom, set_custom] = useState([])

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'tags'
      })

      // FETCH ALLOWED FORMATS
      fetch_formats(state).then(response => {
         set_formats(response)
      })

      // FETCH TRANSPILER
      fetch_transpiler(state).then(response => {
         set_transpiler(response)
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tags' }>
         <div id={ 'inner' }>
            <Info
               header={ 'Tag Manager' }
               data={{
                  'Contract': state.contracts.managers.tag._address,
                  'Allowed Formats': formats.join(', ').toUpperCase(),
                  'Ruleset Transpiler': transpiler.toUpperCase()
               }}
            />
            <List
               header={ 'Standardized Tags (' + standard.length + ')' }
               data={ standard }
               fallback={ 'No tags found.' }
               category={ 'tasks' }
            />
            <List
               header={ 'Custom Tags (' + custom.length + ')' }
               data={ custom }
               fallback={ 'No tags found.' }
               category={ 'tasks' }
            />
         </div>
      </div>
   )
}

export default Tasks;