import React, { Fragment } from 'react';

function Info({ data, header }) { return (
   <Fragment>
      <div id={ 'header' }>{ header }</div>
      <div id={ 'container' }>
         { Object.keys(data).map((key, index) =>
            <Row
               header={ key }
               content={ data[key] }
               key={ index }
            />
         )}
      </div>
   </Fragment>
)}

function Row({ header, content }) { return (
   <div id={ 'topic' }>
      <div className={ 'split' }>
         <div>{ header }</div>
         <div>{ content }</div>
      </div>
   </div>
)}

export default Info;