import { useState, useEffect, useRef } from "react";
//API
import API, { Movie, Movies } from "../api/moviedb.api";

function defaultMoviesObject(): Movies {
  return {
    page: 0,
    results: [] as Movie[],
    total_pages: 0,
    total_results: 0,
  };
}
function defautState() {
  return {
    popular: defaultMoviesObject(),
    topRated: defaultMoviesObject(),
    searchResults: defaultMoviesObject(),
  };
}

type HomeFetchParams = {
  search?: boolean;
  popular?: boolean;
  topRated?: boolean;
};
export default function useMoviesFetch(
  options: HomeFetchParams = {
    search: false,
    popular: true,
    topRated: false,
  }
) {
  //states
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(defautState());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  //private ref
  const pageNumber = useRef(1);
  //effects
  //initial render and search
  useEffect(() => {
    fetchMovies(1);
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;
    pageNumber.current++;
    fetchMovies(pageNumber.current);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm]);

  //functions
  const fetchMovies = async (page: number) => {
    try {
      setError(false);
      setLoading(true);
      let {
        popular: popularMovies,
        searchResults: searchResultMovies,
        topRated: topRatedMovies,
      } = defautState();
      if (options.popular) {
        popularMovies = await API.fetchPopularMovies(page);
      }
      if (options.topRated) {
        topRatedMovies = await API.fetchTopMovies(page);
      }
      if (options.search && searchTerm) {
        searchResultMovies = await API.searchMovies(searchTerm, page);
      }
      // setState((prevState) => {
      //   const newState = defautState();
      //   (newState.popular.results =
      //     page > 1
      //       ? [...prevState.popular.results, ...popularMovies.results]
      //       : [...popularMovies.results]),
      //     (newState.topRated.results =
      //       page > 1
      //         ? [...prevState.topRated.results, ...topRatedMovies.results]
      //         : [...topRatedMovies.results]);
      //   return newState;
      // });

      setState((prevState) => ({
        popular: {
          ...popularMovies,
          results: [...prevState.popular.results, ...popularMovies.results],
        },
        topRated: {
          ...topRatedMovies,
          results: [...prevState.topRated.results, ...topRatedMovies.results],
        },
        searchResults: {
          ...searchResultMovies,
          results: [
            ...prevState.searchResults.results,
            ...searchResultMovies.results,
          ],
        },
      }));
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  //return states
  return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
}