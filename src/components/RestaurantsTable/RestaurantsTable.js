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
  const [page, setPage] = useState(0);
  const [pageEnd, setPageEnd] = useState(10);

  const nextPage = () => {
    const next = page + 10;
    if (next >= restaurantsToDisplay.length) {
      return;
    }
    setPage(next);
    setPageEnd(next + 10);
  };

  const prevPage = () => {
    const prev = page - 10;
    if (prev <= 0) {
      setPage(0);
      setPageEnd(10);
      return;
    }
    setPageEnd(page);
    setPage(prev);
  };

  console.log(page, pageEnd);

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

  const searchByState = (searchList) => {
    if (stateFilter.length) {
      return searchList.filter(
        (restaurant) => restaurant.state === stateFilter,
      );
    }
    return searchList;
  };

  const searchByGenre = (searchList) => {
    if (genreFilter.length) {
      return searchList.filter((restaurant) => {
        if (checkGenres(restaurant.genre, genreFilter)) {
          return restaurant;
        }
      });
    }
    return searchList;
  };

  const searchBySearchTerm = (searchList) => {
    if (searchTerm.length) {
      return searchList.filter((restaurant) => {
        if (compareTerms(restaurant.genre, searchTerm)) {
          return restaurant;
        } else if (compareTerms(restaurant.name, searchTerm)) {
          return restaurant;
        } else if (compareTerms(restaurant.city, searchTerm)) {
          return restaurant;
        }
      });
    }
    return searchList;
  };

  const searchRestaurants = () => {
    if (!searchTerm.length && !stateFilter.length && !genreFilter.length) {
      return;
    }

    let results = listOfRestaurants;
    results = searchByState(results);
    results = searchByGenre(results);
    results = searchBySearchTerm(results);
    setRestaurantsToDisplay(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setStateFilter('');
    setGenreFilter('');
    setRestaurantsToDisplay(listOfRestaurants);
  };

  const createCards = (list) => {
    if (list.length < 10) {
      console.log('longlist');
      // list
      //   .slice(page, pageEnd)
      //   .map((r) => <RestaurantCard key={r.id} {...r} />);
      return list.map((r) => <RestaurantCard key={r.id} {...r} />);
    }
    return list
      .slice(page, pageEnd)
      .map((r) => <RestaurantCard key={r.id} {...r} />);
  };

  useEffect(() => {
    if (!restaurantsToDisplay.length) {
      setRestaurantsToDisplay(listOfRestaurants);
    }
    setGenres(createGenreList(listOfRestaurants));
  }, [listOfRestaurants]);

  useEffect(() => {
    if (searchTerm === '') {
      clearSearch();
    }
  }, [searchTerm]);

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

      {restaurantsToDisplay.length > 10 && (
        <div className='page-btns'>
          <button
            disabled={page === 0 ? true : false}
            onClick={() => prevPage()}>
            Previous
          </button>
          <button
            disabled={restaurantsToDisplay.length < pageEnd ? true : false}
            onClick={() => nextPage()}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantsList;
