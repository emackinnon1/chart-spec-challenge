import React, { useState, useEffect } from 'react';
import './RestaurantsTable.css';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import StatePicker from '../StatePicker/StatePicker';

import { getRestaurantData } from '../../shared/apiCalls';

const RestaurantsList = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [restaurantsToDisplay, setRestaurantsToDisplay] = useState([]);

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

  useEffect(() => {
    searchRestaurants(searchTerm, stateInput);
  }, [searchTerm, stateInput]);

  const searchRestaurants = (term, state) => {
    const results = restaurantsList.filter((restaurant) => {
      if (state === restaurant.state) {
        console.log(restaurant);
        return restaurant;
      }
    });

    // console.log();

    setRestaurantsToDisplay(results);
  };

  const createCards = () => {
    if (!restaurantsToDisplay.length) {
      return restaurantsList.map((r) => <RestaurantCard key={r.id} {...r} />);
    }
    return restaurantsToDisplay.map((r) => (
      <RestaurantCard key={r.id} {...r} />
    ));
  };

  const noResults = <p>No results found</p>;

  return (
    <div className='restaurant-list'>
      <div className='search-container'>
        <form>
          <input
            id='name-input'
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder='Search'
          />
          <StatePicker stateInput={stateInput} setStateInput={setStateInput} />
          <div className='search-btns'>
            <button type='submit' className='search-btn'>
              Search
            </button>
            <button className='clear-btn'>Clear</button>
          </div>
        </form>
      </div>
      {createCards(restaurantsToDisplay)}
    </div>
  );
};

export default RestaurantsList;
