import React from 'react';

const Collapsible = (props) => {
  return (
    <div>
      <p>Attire: {props?.attire}</p>
      <p>{props?.hours}</p>
      <p>Latitude: {props?.lat}</p>
      <p>Longitude: {props?.long}</p>
      <p>{props?.genre}</p>
    </div>
  );
};

export default Collapsible;
