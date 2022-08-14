import { useState, useEffect, useRef } from "react";
//API
import API, { Movie, Movies, Show, Shows } from "../api/moviedb.api";

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
    popularMovies: defaultMoviesObject(),
    topRatedMovies: defaultMoviesObject(),
    searchResultsMovies: defaultMoviesObject(),
    trendingMovies: defaultMoviesObject(),
  };
}

//Shows
function defaultShowsObject(): Shows {
  return {
    page: 0,
    results: [] as Show[],
    total_pages: 0,
    total_results: 0,
  };
}
function defautShowsState() {
  return {
    popularShows: defaultShowsObject(),
    topRatedShows: defaultShowsObject(),
    searchResultsShows: defaultShowsObject(),
    trendingShows: defaultShowsObject(),
  };
}

//defualtState
function defaultState() {
  return {
    movies: defaultMovieState(),
    shows: defautShowsState(),
  };
}
type FetchParams = {
  search?: boolean;
  popular?: boolean;
  topRated?: boolean;
  trending?: "day" | "week" | null;
};
export default function useMoviesFetch(
  options: FetchParams = {
    search: false,
    popular: true,
    topRated: false,
    trending: null,
  }
) {
  //states
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(defaultState());
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
      let { shows, movies } = defaultState();
      let {
        popularMovies,
        searchResultsMovies,
        topRatedMovies,
        trendingMovies,
      } = movies;

      let { popularShows, topRatedShows, searchResultsShows, trendingShows } =
        shows;

      if (options.popular) {
        popularMovies = await API.fetchPopularMovies(page);
        // popularShows = await
      }
      if (options.topRated) {
        topRatedMovies = await API.fetchTopMovies(page);
        // topRatedShows =
      }
      if (options.search && searchTerm) {
        searchResultsMovies = await API.searchMovies(searchTerm, page);
        searchResultsShows = await API.searchShows(searchTerm, page);
      }
      if (options.trending) {
        trendingMovies = await API.fetchTrendingMovies(options.trending);
        // trendingShows =
      }

      setState((prevState) => ({
        movies: {
          popularMovies: updateMoviesState(
            popularMovies,
            prevState.movies.popularMovies,
            page
          ),
          topRatedMovies: updateMoviesState(
            topRatedMovies,
            prevState.movies.topRatedMovies,
            page
          ),
          searchResultsMovies: updateMoviesState(
            searchResultsMovies,
            prevState.movies.searchResultsMovies,
            page
          ),
          trendingMovies: { ...trendingMovies },
        },
        shows: {
          popularShows: updateShowsState(
            popularShows,
            prevState.shows.popularShows,
            page
          ),
          topRatedShows: updateShowsState(
            topRatedShows,
            prevState.shows.topRatedShows,
            page
          ),
          searchResultsShows: updateShowsState(
            searchResultsShows,
            prevState.shows.searchResultsShows,
            page
          ),
          trendingShows: { ...trendingShows },
        },
        /*
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

        */
      }));
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  //return states
  return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
}

function updateMoviesState(
  newMovies: Movies,
  prevMovies: Movies,
  page: number
): Movies {
  return {
    ...newMovies,
    results:
      page > 1
        ? [...newMovies.results, ...prevMovies.results]
        : [...newMovies.results],
  };
}

function updateShowsState(
  newShows: Shows,
  prevShows: Shows,
  page: number
): Shows {
  return {
    ...newShows,
    results:
      page > 1
        ? [...newShows.results, ...prevShows.results]
        : [...newShows.results],
  };
}
