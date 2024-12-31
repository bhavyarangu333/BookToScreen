import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";

const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setBookData] = useState([]);
    const [movieData, setMovieData] = useState([]);

    // Search for books (triggered by "Enter" key or button click)
    const searchBook = () => {
        if (search.trim()) {
            console.log(`Searching for book: ${search}`); // Debug log
            axios
                .get(
                    `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=40`
                )
                .then((res) => {
                    console.log('Book search response:', res); // Debug log
                    setBookData(res.data.items);
                })
                .catch((err) => {
                    console.error('Error fetching books:', err); // Debug log
                });
        }
    };

    // Fetch movies related to the book name
    const fetchMovie = () => {
        if (search.trim()) {
            console.log(`Fetching movies related to: ${search}`); // Debug log
            axios
                .get(`https://www.omdbapi.com/?s=${search}&apikey=e2f87639`)
                .then((res) => {
                    console.log('Movie search response:', res); // Debug log
                    if (res.data.Search) {
                        setMovieData(res.data.Search);
                        console.log('Updated movie data:', res.data.Search); // Debug log
                    } else {
                        setMovieData([]);
                        alert("No movies found related to this book name.");
                    }
                })
                .catch((err) => {
                    console.error('Error fetching movies:', err); // Debug log
                });
        }
    };

    // Search for books when the user presses the Enter key
    const handleKeyPress = (evt) => {
        if (evt.key === "Enter") {
            searchBook();
        }
    };

    return (
        <>
            <div className="header">
                <div className="row1">
                    <h1>
                        A room without books is like
                        <br /> a body without a soul.
                    </h1>
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Enter Your Book Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={searchBook}>Search Book</button>
                    </div>
                    <div className="movie-search">
                        <button onClick={fetchMovie}>
                            Liked Book? Want to Watch a Similar Movie?
                        </button>
                    </div>
                    <img src="./images/bg2.png" alt="" />
                </div>
            </div>

            <div className="container">
                <Card book={bookData} />
            </div>

            {movieData.length > 0 && (
                <div className="movies">
                    <h2>Movies Related to "{search}"</h2>
                    <div className="movie-list">
                        {movieData.map((movie) => (
                            <div key={movie.imdbID} className="movie-card">
                                <h3>{movie.Title}</h3>
                                <p>Year: {movie.Year}</p>
                                <img src={movie.Poster} alt={movie.Title} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Main;
