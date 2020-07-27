import React from 'react';

function Info({ data }) { return (
   <div id={ 'container' }>
      { Object.keys(data).map((key, index) =>
         <Row
            header={ key }
            content={ data[key] }
            key={ index }
         />
      )}
   </div>
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