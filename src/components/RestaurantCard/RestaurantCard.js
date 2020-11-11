import React, { useState } from 'react';

const RestaurantCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div class='restaurant-card'>
      <div class='restaurant-info'>
        <h2>{props?.name}</h2>
        {props?.address1}
        {props?.attire}
        {props?.city}
        {props?.genre}
        {props?.hours}
        {props?.lat}
        {props?.long}
        {props?.state}
        {props?.tags}
        {props?.telephone}
        {props?.website}
        {props?.zip}
      </div>
      <div onClick={() => setExpanded(!expanded)} className='expand-btn'>
        {expanded ? '-' : '+'}
      </div>
    </div>
  );
};

export default RestaurantCard;
