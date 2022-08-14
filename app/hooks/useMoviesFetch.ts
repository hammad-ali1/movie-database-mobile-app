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
  searchMovies?: boolean;
  popularMovies?: boolean;
  topRatedMovies?: boolean;
  trendingMovies?: "day" | "week" | null;
};

export default function useMoviesFetch(
  options: FetchParams = {
    searchMovies: false,
    popularMovies: true,
    topRatedMovies: true,
    trendingMovies: "day",
  }
) {
  //states
  //movies
  const [popularMovies, setPopularMovies] = useState(defaultMoviesObject());
  const [topRatedMovies, setTopRatedMovies] = useState(defaultMoviesObject());
  const [searchResultsMovies, setSearchResultsMovies] = useState(
    defaultMoviesObject()
  );
  const [trendingMovies, setTrendingMovies] = useState(defaultMoviesObject());
  const loadMore = {
    loadPopularMovies,
    loadTopRatedMovies,
    loadSearchResultsMovies,
    loadTrendingMovies,
  };
  //Movie loaders
  async function loadPopularMovies() {
    const newMovies = await API.fetchPopularMovies(popularMovies.page + 1);
    setPopularMovies((prevMovies) => ({
      ...newMovies,
      results: [...prevMovies.results, ...newMovies.results],
    }));
  }

  async function loadTopRatedMovies() {
    const newMovies = await API.fetchTopMovies(topRatedMovies.page + 1);
    setTopRatedMovies((prevMovies) => ({
      ...newMovies,
      results: [...prevMovies.results, ...newMovies.results],
    }));
  }
  async function loadSearchResultsMovies(searchTerm: string) {
    const newMovies = await API.searchMovies(
      searchTerm,
      searchResultsMovies.page + 1
    );
    setSearchResultsMovies((prevMovies) => ({
      ...newMovies,
      results: [...prevMovies.results, ...newMovies.results],
    }));
  }
  async function loadTrendingMovies(time_limit: "day" | "week") {
    const newMovies = await API.fetchTrendingMovies(
      trendingMovies.page + 1,
      time_limit
    );
    setTrendingMovies((prevMovies) => ({
      ...newMovies,
      results: [...prevMovies.results, ...newMovies.results],
    }));
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadOptions, setLoadOptions] = useState<FetchParams>({});
  //private ref
  // const pageNumber = useRef(1);
  //effects
  //initial render and search

  // function resetOptions() {
  //   options.popularMovies = false;
  //   options.searchMovies = false;
  //   options.topRatedMovies = false;
  //   options.trendingMovies = null;
  // }

  useEffect(() => {
    fetchState(options); //fetch with initial option configuration
  }, [searchTerm]);

  useEffect(() => {
    if (Object.keys(loadOptions).length === 0) return; //if nothing to load then return
    fetchState(loadOptions);
    setLoadOptions({});
  }, [loadOptions, searchTerm]);

  //functions
  const fetchState = async (options: FetchParams) => {
    try {
      setError(false);
      setLoading(true);

      if (options.popularMovies) {
        loadMore.loadPopularMovies();
        // popularShows = await API.fetchPopularShows(page);
      }
      if (options.topRatedMovies) {
        loadMore.loadTopRatedMovies();
        // topRatedShows = await API.fetchTopShows(page);
      }
      if (options.searchMovies && searchTerm) {
        loadMore.loadSearchResultsMovies(searchTerm);
        // searchResultsShows = await API.searchShows(searchTerm, page);
      }
      if (options.trendingMovies) {
        loadMore.loadTrendingMovies(options.trendingMovies);
        // trendingShows = await API.fetchTrendingShows(options.trending);
      }

      /*
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

      }));
      
      */
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  const state = {
    movies: {
      popularMovies,
      topRatedMovies,
      searchResultsMovies,
      trendingMovies,
    },
  };
  //return states
  return { state, loading, error, setSearchTerm, searchTerm, setLoadOptions };
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
