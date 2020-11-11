import React, { useEffect, useState } from 'react';
import RestaurantsTable from '../RestaurantsTable/RestaurantsTable';
import './App.css';

import { getRestaurantData } from '../../shared/apiCalls';

const App = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      const restaurants = await getRestaurantData();
      const sorted = restaurants.sort((a, b) => a.name.localeCompare(b.name));
      setRestaurantsList(sorted);
    };
    if (mounted) {
      getData();
    }
    return () => (mounted = false);
  }, []);

  return (
    <div className='App'>
      <RestaurantsTable listOfRestaurants={restaurantsList} />
    </div>
  );
};

export default App;
