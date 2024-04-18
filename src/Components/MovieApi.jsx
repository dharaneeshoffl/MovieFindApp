import React, { useState } from "react";
import axios from "axios";
import "./MovieApi.css";

export default function MovieApi() {
  let [query, setQuery] = useState("");
  let [movies, setMovies] = useState([]);
  let [isLoading, setisloading] = useState(true);

  let searchMovies = async () => {
    try {
      let response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=d0e3f9fa`
      );
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
      setisloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="Head">
      <div className="NA">
        <h1>{isLoading && "Loading"}</h1>
        <h1 className="hi">Movie Search &#128269;</h1>
        <input
          className="Input"
          type="text"
          placeholder=" Please enter the movie name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="Button" onClick={searchMovies}>
          Search
        </button>
        <h1>{isLoading && <span class="loader"></span>}</h1>
      </div>
      <div className="Content">
        {movies.map(({ Title, Year, Poster }) => {
          return (
            <div className="CA">
              <img className="Img" src={Poster} alt="" />
              <h1 className="Para">Movie:&nbsp;{Title}</h1>
              <h1 className="Para">Year:&nbsp;{Year}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
