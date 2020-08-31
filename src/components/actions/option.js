import React from 'react';

function Option({ header, func }) { return (
    <li id={ 'action' } onClick={ func }>{ header }</li>
)}

export default Option;