import React, { useState, useEffect } from 'react';
import './RestaurantsTable.css';

import RestaurantCard from '../RestaurantCard/RestaurantCard';
import StateFilter from '../StateFilter/StateFilter';
import GenreFilter from '../GenreFilter/GenreFilter';

const RestaurantsList = ({ listOfRestaurants }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [restaurantsToDisplay, setRestaurantsToDisplay] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');

  const createGenreList = (restaurants) => {
    let genres = [];
    restaurants.forEach((r) => {
      r.genre.split(',').forEach((g) => {
        if (!genres.includes(g)) {
          genres.push(g);
        }
      });
    });
    return genres;
  };

  const compareTerms = (term1, term2) => {
    if (term1.toLowerCase().includes(term2.toLowerCase())) {
      return true;
    }
    return false;
  };

  const checkGenres = (restaurantGenres, genre) => {
    const list = restaurantGenres.split(',');
    if (list.includes(genre)) {
      return true;
    }
    return false;
  };

  const searchRestaurants = () => {
    if (!searchTerm.length && !stateFilter.length && !genreFilter) {
      return;
    }

    console.log(genreFilter);

    let results;

    if (stateFilter.length) {
      results = restaurantsToDisplay.filter(
        (restaurant) => restaurant.state === stateFilter,
      );
      setRestaurantsToDisplay(results);
    }

    if (genreFilter.length) {
      results = restaurantsToDisplay.filter((restaurant) => {
        if (checkGenres(restaurant.genre, genreFilter)) {
          return restaurant;
        }
      });
      setRestaurantsToDisplay(results);
    }

    if (searchTerm.length) {
      results = restaurantsToDisplay.filter((restaurant) => {
        if (compareTerms(restaurant.genre, searchTerm)) {
          return restaurant;
        } else if (compareTerms(restaurant.name, searchTerm)) {
          return restaurant;
        } else if (compareTerms(restaurant.city, searchTerm)) {
          return restaurant;
        }
      });
    }

    setRestaurantsToDisplay(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setStateFilter('');
    setGenreFilter('');
    setRestaurantsToDisplay(listOfRestaurants);
  };

  const createCards = (list) => {
    return list.map((r) => <RestaurantCard key={r.id} {...r} />);
  };

  useEffect(() => {
    if (!restaurantsToDisplay.length) {
      setRestaurantsToDisplay(listOfRestaurants);
    }
    setGenres(createGenreList(listOfRestaurants));
  }, [listOfRestaurants]);

  return (
    <div className='restaurant-list'>
      <div className='search-container'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchRestaurants();
          }}>
          <input
            id='name-input'
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            placeholder='Search'
          />
          <StateFilter
            stateFilter={stateFilter}
            setStateFilter={setStateFilter}
          />
          <GenreFilter
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
            genreList={genres}
          />
          <div className='search-btns'>
            <button type='submit' className='search-btn'>
              Search
            </button>
            <button
              className='clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearSearch();
              }}>
              Clear
            </button>
          </div>
        </form>
      </div>
      {restaurantsToDisplay.length ? (
        createCards(restaurantsToDisplay)
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default RestaurantsList;
