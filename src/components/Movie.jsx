import React, { useState, useEffect } from "react";

function Movie() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=61407899")
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.log(err));
  }, []); // empty array = run only once when page loads

  return (
    <div>
      <h1>Movie Details</h1>
      {movie ? (
        <div>
          <h2>{movie.Title}</h2>
          <p>Year: {movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Movie;
