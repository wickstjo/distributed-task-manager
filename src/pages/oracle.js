import React, { Fragment } from 'react';

export default ({ match }) => { return (
   <Fragment>
      <div id={ 'header' }>Oracle</div>
      <div id={ 'container' }>
         <div id={ 'fallback' }>{ match.params.hash }</div>
      </div>
   </Fragment>
)}