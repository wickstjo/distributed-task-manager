import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../assets/context';
import { decode } from '../funcs/process';
import { details as fetch_details } from '../funcs/contract/tag';
import '../interface/css/tasks.scss';
import Info from '../components/shared/info';

function Tag({ match }) {
   
   // GLOBAL STATE
   const { state, dispatch } = useContext(Context)

   // LOCAL STATES
   const [details, set_details] = useState({
      decoded: {}
   })

   // ON LOAD
   useEffect(() => {
      dispatch({
         type: 'header',
         payload: 'tag'
      })

      // FETCH TRANSPILER
      fetch_details(match.params.name, state).then(response => {

         // DECODE & PARSE RULESET
         const decoded = decode(response.ruleset)

         // SET IN STATE
         set_details({
            author: response.author,
            created: response.created,
            ruleset: response.ruleset,
            decoded: decoded
         })
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div id={ 'tags' }>
         <div id={ 'inner' }>
            <Info
               header={ 'Tag Overview' }
               data={{
                  'Name': match.params.name,
                  'Created': details.created,
                  'Author': details.author,
                  'Encoded': details.ruleset
               }}
            />
            <Info
               header={ 'Ruleset' }
               data={ details.decoded }
            />
         </div>
      </div>
   )
}

export default Tag;