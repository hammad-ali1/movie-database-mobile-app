import { useState, useEffect } from "react";
//API
import API, { Movie } from "../api/moviedb.api";

const initialState = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};
export const useHomeFetch = () => {
  //states
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  //effects
  //initial render and search
  useEffect(() => {
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);
  //functions
  const fetchMovies = async (page: number, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState((prevState) => ({
        ...movies,
        results:
          page > 1
            ? [...prevState.results, ...movies.results]
            : [...movies.results],
      }));
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  //return states
  return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
};
