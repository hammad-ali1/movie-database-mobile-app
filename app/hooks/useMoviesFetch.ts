import { useState, useEffect, useRef } from "react";
//API
import API, { Movie, Movies } from "../api/moviedb.api";

//Movies
function defaultMoviesObject(): Movies {
  return {
    page: 0,
    results: [] as Movie[],
    total_pages: 0,
    total_results: 0,
  };
}
function defaultMovieState() {
  return {
    popular: defaultMoviesObject(),
    topRated: defaultMoviesObject(),
    searchResults: defaultMoviesObject(),
    trendingMovies: defaultMoviesObject(),
  };
}

//

type HomeFetchParams = {
  search?: boolean;
  popular?: boolean;
  topRated?: boolean;
  trending?: "day" | "week" | null;
};
export default function useMoviesFetch(
  options: HomeFetchParams = {
    search: false,
    popular: true,
    topRated: false,
    trending: null,
  }
) {
  //states
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(defaultMovieState());
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
        trendingMovies,
      } = defaultMovieState();
      if (options.popular) {
        popularMovies = await API.fetchPopularMovies(page);
      }
      if (options.topRated) {
        topRatedMovies = await API.fetchTopMovies(page);
      }
      if (options.search && searchTerm) {
        searchResultMovies = await API.searchMovies(searchTerm, page);
      }
      if (options.trending) {
        trendingMovies = await API.fetchTrendingMovies(options.trending);
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
          results:
            page > 1
              ? [...prevState.popular.results, ...popularMovies.results]
              : [...popularMovies.results],
        },
        topRated: {
          ...topRatedMovies,

          results:
            page > 1
              ? [...prevState.topRated.results, ...topRatedMovies.results]
              : [...topRatedMovies.results],
        },
        searchResults: {
          ...searchResultMovies,
          results:
            page > 1
              ? [
                  ...prevState.searchResults.results,
                  ...searchResultMovies.results,
                ]
              : [...searchResultMovies.results],
        },
        trendingMovies: { ...trendingMovies },
      }));
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  //return states
  return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
}
