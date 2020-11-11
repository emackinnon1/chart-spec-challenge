import React, { useState, useEffect } from 'react';
import './RestaurantsTable.css';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

import { getRestaurantData } from '../../shared/apiCalls';

const RestaurantsList = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      setRestaurantsList(await getRestaurantData());
    };

    if (mounted) {
      getData();
    }

    return () => (mounted = false);
  }, []);

  console.log(restaurantsList);

  return (
    <div>
      {restaurantsList.map((r) => (
        <RestaurantCard key={r.id} {...r} />
      ))}
    </div>
  );
};

export default RestaurantsList;
