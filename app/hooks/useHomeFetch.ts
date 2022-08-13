import { useState, useEffect, useRef } from "react";
//API
import API, { Movie, Movies } from "../api/moviedb.api";

function defaultMoviesObject() {
  return {
    page: 0,
    results: [] as Movie[],
    total_pages: 0,
    total_results: 0,
  };
}
const initialState = {
  popular: defaultMoviesObject(),
  topRated: defaultMoviesObject(),
};

type HomeFetchParams = {
  loadOnSearch?: boolean;
  popular?: boolean;
  topRated?: boolean;
};
export const useHomeFetch = (
  options: HomeFetchParams = {
    loadOnSearch: false,
    popular: true,
    topRated: false,
  }
) => {
  //states
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  //private ref
  const pageNumber = useRef(1);
  //effects
  //initial render and search
  useEffect(() => {
    // setState(initialState);
    if (options.loadOnSearch && !searchTerm) {
      setState({
        popular: defaultMoviesObject(),
        topRated: defaultMoviesObject(),
      });
      pageNumber.current = 0;
      return;
    } //load only when searchTerm is specified
    fetchMovies(1, searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    if (!isLoadingMore) return;
    if (options.loadOnSearch && !searchTerm) {
      setState({
        popular: defaultMoviesObject(),
        topRated: defaultMoviesObject(),
      });
      pageNumber.current = 0;
      return;
    }
    pageNumber.current++;
    fetchMovies(pageNumber.current, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm]);
  //functions
  const fetchMovies = async (page: number, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);
      let popularMovies: Movies = defaultMoviesObject();
      let topRatedMovies: Movies = defaultMoviesObject();
      if (options.popular) {
        popularMovies = await API.fetchPopularMovies(searchTerm, page);
      }
      if (options.topRated) {
        topRatedMovies = await API.fetchPopularMovies(searchTerm, page);
      }
      setState((prevState) => {
        const newState = initialState;
        (newState.popular.results =
          page > 1
            ? [...prevState.popular.results, ...popularMovies.results]
            : [...popularMovies.results]),
          (newState.topRated.results =
            page > 1
              ? [...prevState.topRated.results, ...topRatedMovies.results]
              : [...topRatedMovies.results]);
        return newState;
      });
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  //return states
  return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
};
