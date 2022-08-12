import { useState, useEffect, useCallback } from "react";
import API, { Movie, Cast, Crew } from "../api/moviedb.api";

//Types
export interface MovieStateType extends Movie {
  actors: Cast[];
  directors: Crew[];
}
type MovieFetchReturnType = {
  state: MovieStateType;
  loading: boolean;
  error: boolean;
};
export const useMovieFetch = (movieId: number): MovieFetchReturnType => {
  //States
  const [state, setState] = useState({} as MovieStateType);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //Callbacks
  const fetchMovie = useCallback(async (movieId: number) => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);
      //Get directors
      const directors = credits.crew.filter(
        (crewMember) => crewMember.job === "Director"
      );

      //setState
      setState({ ...movie, actors: credits.cast, directors });
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }, []);

  //Effects
  useEffect(() => {
    fetchMovie(movieId);
  }, [movieId, fetchMovie]);

  //return statement of hook
  return { state, loading, error };
};
