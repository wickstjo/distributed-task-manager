import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Context } from '../assets/context';
import { decode } from '../funcs/process';
import { details as fetch_details } from '../funcs/contract/service';
import { Link } from 'react-router-dom';

import Info from '../components/shared/info';
import List from '../components/shared/list';

function Service({ match }) {
   
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
         payload: 'service'
      })

      // SET TRIGGER
      dispatch({
         type: 'trigger',
         payload: match.params.name
      })

      // FETCH THE DETAILS
      fetch_details(match.params.name, state).then(response => {

         // DECODE & PARSE RULESET
         const decoded = decode(response.ruleset)

         // SET IN STATE
         set_details({
            author: response.author,
            created: response.created,
            decoded: decoded
         })
      })

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Fragment>
         <Info
            header={ 'Service Overview' }
            data={{
               'Name': match.params.name,
               'Author': <Link to={ '/users/' + details.author }>{ details.author }</Link>,
               'Genesis Block': details.created,
            }}
         />
         <Info
            header={ 'Ruleset' }
            data={ details.decoded }
            fallback={ 'No ruleset found for service.' }
         />
         <List
            header={ 'Available Devices' }
            data={ state.query.results }
            fallback={ state.query.active ? 'Awaiting responses...' : 'A query must first be performed.' }
            category={ '/devices' }
         />
      </Fragment>
   )
}

export default Service;