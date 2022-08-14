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

//Shows
function defaultShowsObject(): Shows {
  return {
    page: 0,
    results: [] as Show[],
    total_pages: 0,
    total_results: 0,
  };
}

type OptionsType = {
  searchMovies?: boolean;
  popularMovies?: boolean;
  topRatedMovies?: boolean;
  trendingMovies?: "day" | "week" | null;
  searchShows?: boolean;
  popularShows?: boolean;
  topRatedShows?: boolean;
  trendingShows?: "day" | "week" | null;
};

export default function useMoviesFetch(
  options: OptionsType = {
    searchMovies: false,
    popularMovies: true,
    topRatedMovies: true,
    trendingMovies: "day",
    searchShows: false,
    popularShows: true,
    topRatedShows: true,
    trendingShows: "day",
  }
) {
  //states

  const [popularMovies, setPopularMovies] = useState(defaultMoviesObject());
  const [topRatedMovies, setTopRatedMovies] = useState(defaultMoviesObject());
  const [searchResultsMovies, setSearchResultsMovies] = useState(
    defaultMoviesObject()
  );
  const [trendingMovies, setTrendingMovies] = useState(defaultMoviesObject());
  const [popularShows, setPopularShows] = useState(defaultShowsObject());
  const [topRatedShows, setTopRatedShows] = useState(defaultShowsObject());
  const [searchResultsShows, setSearchResultsShows] = useState(
    defaultShowsObject()
  );
  const [trendingShows, setTrendingShows] = useState(defaultShowsObject());
  //state loaders
  const loadMore = {
    loadPopularMovies,
    loadTopRatedMovies,
    loadSearchResultsMovies,
    loadTrendingMovies,
    loadPopularShows,
    loadTopRatedShows,
    loadSearchResultsShows,
    loadTrendingShows,
  };
  async function loadPopularMovies() {
    const newMovies = await API.fetchPopularMovies(popularMovies.page + 1);

    setPopularMovies((prevMovies) => setter(prevMovies, newMovies));
  }

  async function loadTopRatedMovies() {
    const newMovies = await API.fetchTopMovies(topRatedMovies.page + 1);
    setTopRatedMovies((prevMovies) => setter(prevMovies, newMovies));
  }
  async function loadSearchResultsMovies(searchTerm: string) {
    const newMovies = await API.searchMovies(
      searchTerm,
      searchResultsMovies.page + 1
    );
    setSearchResultsMovies((prevMovies) => setter(prevMovies, newMovies));
  }
  async function loadTrendingMovies(time_limit: "day" | "week") {
    const newMovies = await API.fetchTrendingMovies(
      trendingMovies.page + 1,
      time_limit
    );
    setTrendingMovies((prevMovies) => setter(prevMovies, newMovies));
  }

  async function loadPopularShows() {
    const newShows = await API.fetchPopularShows(popularShows.page + 1);
    setPopularShows((prevShows) => setter(prevShows, newShows));
  }

  async function loadTopRatedShows() {
    const newShows = await API.fetchTopShows(topRatedShows.page + 1);
    setTopRatedShows((prevShows) => setter(prevShows, newShows));
  }
  async function loadSearchResultsShows(searchTerm: string) {
    const newShows = await API.searchShows(
      searchTerm,
      searchResultsShows.page + 1
    );
    setSearchResultsShows((prevShows) => setter(prevShows, newShows));
  }
  async function loadTrendingShows(time_limit: "day" | "week") {
    const newShows = await API.fetchTrendingShows(
      trendingShows.page + 1,
      time_limit
    );
    setTrendingShows((prevShows) => setter(prevShows, newShows));
  }

  //other states
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadOptions, setLoadOptions] = useState<OptionsType>({});

  useEffect(() => {
    fetchState(options); //fetch with initial option configuration
  }, [searchTerm]);

  useEffect(() => {
    if (Object.keys(loadOptions).length === 0) return; //if nothing to load then return
    fetchState(loadOptions);
    setLoadOptions({});
  }, [loadOptions, searchTerm]);

  //functions
  const fetchState = async (options: OptionsType) => {
    try {
      setError(false);
      setLoading(true);

      if (options.popularMovies) {
        loadMore.loadPopularMovies();
      }
      if (options.popularShows) {
        loadMore.loadPopularShows();
      }
      if (options.topRatedMovies) {
        loadMore.loadTopRatedMovies();
      }
      if (options.topRatedShows) {
        loadMore.loadTopRatedShows();
      }
      if (options.searchMovies && searchTerm) {
        loadMore.loadSearchResultsMovies(searchTerm);
      }
      if (options.searchShows && searchTerm) {
        loadMore.loadSearchResultsShows(searchTerm);
      }
      if (options.trendingMovies) {
        loadMore.loadTrendingMovies(options.trendingMovies);
      }
      if (options.trendingShows) {
        loadMore.loadTrendingShows(options.trendingShows);
      }
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
    shows: {
      popularShows,
      topRatedShows,
      searchResultsShows,
      trendingShows,
    },
  };
  //return states
  return { state, loading, error, setSearchTerm, searchTerm, setLoadOptions };
}

function setter<T extends Movies | Shows>(prevState: T, newState: T): T {
  return {
    ...newState,
    results: [...prevState.results, ...newState.results],
  };
}
