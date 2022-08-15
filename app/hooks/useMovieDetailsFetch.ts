import { useState, useEffect, useCallback } from "react";
import API, { Movie, Cast, Crew, Movies } from "../api/moviedb.api";

//Types
export class MovieStateType extends Movie {
  actors: Cast[] = [];
  directors: Crew[] = [];
}

const useMovieDetailsFetch = (movieId: number) => {
  //States
  const [movie, setMovie] = useState(new MovieStateType());
  const [similarMovies, setSimilarMovies] = useState(new Movies());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //Callbacks
  const fetchMovie = useCallback(async (movieId: number) => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);
      const similarMovies = await API.fetchSimilarMovies(movieId);

      //Get directors
      const directors = credits.crew.filter(
        (crewMember) => crewMember.job === "Director"
      );

      //setState
      setMovie({ ...movie, actors: credits.cast, directors });
      setSimilarMovies(similarMovies);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }, []);

  //Effects
  useEffect(() => {
    fetchMovie(movieId);
  }, [movieId, fetchMovie]);

  const state = {
    movie,
    similarMovies,
  };
  //return statement of hook
  return { state, loading, error };
};

export default useMovieDetailsFetch;
