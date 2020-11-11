import React from 'react';
import RestaurantsTable from '../RestaurantsTable/RestaurantsTable';
import './App.css';

import { getRestaurantData } from '../../shared/apiCalls';

const App = () => {
  return (
    <div className='App'>
      <RestaurantsTable />
    </div>
  );
};

export default App;
