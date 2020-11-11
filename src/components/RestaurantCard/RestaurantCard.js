import React, { useState } from 'react';
import './RestaurantCard.css';

import Collapsible from '../Collapsible/Collapsible';

const RestaurantCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='restaurant-card'>
      <div className='restaurant-info'>
        <h2>{props?.name}</h2>
        <p>{props?.telephone}</p>
        <p>{props?.website}</p>
        <p>{`${props?.address1}, ${props?.city}, ${props?.state} ${props?.zip}`}</p>
        {expanded && <Collapsible {...props} />}
      </div>
      <div onClick={() => setExpanded(!expanded)} className='expand-btn'>
        {expanded ? '-' : '+'}
      </div>
    </div>
  );
};

export default RestaurantCard;
