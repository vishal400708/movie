import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!movie.trim()) {
      setMovies([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      setLoading(true);

      fetch(`https://www.omdbapi.com/?s=${movie}&apikey=61407899`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Response === "True") {
            setMovies(data.Search.slice(0, 10));
          } else {
            setMovies([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setMovies([]);
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [movie]);

  const handleMovieClick = (m) => {
    setSelectedMovie(m);
  };

  const clearSearch = () => {
    setMovie("");
    setMovies([]);
    setSelectedMovie(null);
    inputRef.current.focus();
  };

  return (
    <div className="app-container">
      {/* Animated Background */}
      <div className="background-animation">
        <div className="grid-lines"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="logo-container">
              <div className="logo-icon">🎬</div>
              <h1 className="logo-text">CINEMATRIX</h1>
            </div>
            <p className="tagline">Discover the Universe of Cinema</p>
          </div>
        </header>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <div className="search-icon">🔍</div>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Enter movie title..."
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                autoFocus
              />
              {movie && (
                <button className="clear-btn" onClick={clearSearch}>
                  ✕
                </button>
              )}
            </div>
            <div className="search-hint">
              <span className="hint-text">
                Start typing to explore movies...
              </span>
              <span className="hint-arrow">↓</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Scanning database...</p>
            </div>
          )}

          {!loading && movie && movies.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🚫</div>
              <p className="no-results-text">
                No movies found. Try another search.
              </p>
            </div>
          )}

          {movies.length > 0 && (
            <div className="results-grid">
              {movies.map((m) => (
                <div
                  key={m.imdbID}
                  className={`movie-card ${
                    selectedMovie?.imdbID === m.imdbID ? "selected" : ""
                  }`}
                  onClick={() => handleMovieClick(m)}
                >
                  <div className="movie-card-inner">
                    <div className="movie-poster-container">
                      {m.Poster !== "N/A" ? (
                        <img
                          src={m.Poster}
                          alt={m.Title}
                          className="movie-poster"
                          loading="lazy"
                        />
                      ) : (
                        <div className="poster-placeholder">
                          <span className="placeholder-icon">🎞️</span>
                        </div>
                      )}
                      <div className="movie-year-badge">{m.Year}</div>
                    </div>

                    <div className="movie-info">
                      <h3 className="movie-title">{m.Title}</h3>
                      <div className="movie-type">{m.Type}</div>
                    </div>

                    <div className="movie-overlay">
                      <button className="view-details-btn">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Movie Details */}
          {selectedMovie && (
            <div className="movie-details-panel">
              <div className="details-header">
                <h2>{selectedMovie.Title}</h2>
                <button
                  className="close-details"
                  onClick={() => setSelectedMovie(null)}
                >
                  ✕
                </button>
              </div>
              <div className="details-content">
                <div className="details-poster">
                  {selectedMovie.Poster !== "N/A" ? (
                    <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
                  ) : (
                    <div className="details-poster-placeholder">
                      <span>No Poster Available</span>
                    </div>
                  )}
                </div>
                <div className="details-info">
                  <div className="info-row">
                    <span className="info-label">Year:</span>
                    <span className="info-value">{selectedMovie.Year}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Type:</span>
                    <span className="info-value">{selectedMovie.Type}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">IMDB ID:</span>
                    <span className="info-value">{selectedMovie.imdbID}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">Powered by OMDB API • CINEMATRIX © 2024</p>
          <div className="footer-stats">
            <span className="stat">
              <span className="stat-number">{movies.length}</span>
              <span className="stat-label">Movies Found</span>
            </span>
            <span className="stat">
              <span className="stat-number">10</span>
              <span className="stat-label">Max Results</span>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
