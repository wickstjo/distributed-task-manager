import React, { Fragment } from 'react';

export default ({ match }) => { return (
   <Fragment>
      <div id={ 'header' }>Task</div>
      <div id={ 'container' }>
         <div id={ 'fallback' }>{ match.params.address }</div>
      </div>
   </Fragment>
)}