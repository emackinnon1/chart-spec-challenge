import React, { useState } from 'react';
import './GenreFilter.css';

const GenreFilter = ({ genreFilter, setGenreFilter, genreList }) => {
  return (
    <div>
      <select
        multiple={false}
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value)}>
        <option disabled value=''>
          All genres
        </option>
        {genreList.map((genre, i) => (
          <option key={i} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
