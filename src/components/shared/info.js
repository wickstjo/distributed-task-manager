import React, { Fragment } from 'react';

function Info({ data, fallback, header }) { return (
   <Fragment>
      <div id={ 'header' }>{ header }</div>
      <div id={ 'container' }>
         <Content
            data={ data }
            fallback={ fallback }
         />
      </div>
   </Fragment>
)}

function Content({ data, fallback }) {
   switch(Object.keys(data).length) {

      case 0: { return (
         <div id={ 'topic' }>{ fallback }</div>
      )}

      default: {
         return Object.keys(data).map((key, index) =>
            <Row
               header={ key }
               content={ data[key] }
               key={ index }
            />
         )
      }
   }
}

function Row({ header, content }) { return (
   <div id={ 'topic' }>
      <div className={ 'split' }>
         <div>{ header }</div>
         <div>{ content }</div>
      </div>
   </div>
)}

export default Info;