import { useState, useEffect, useRef } from "react";
//API
import API, { Movie, Movies, Show, Shows } from "../api/moviedb.api";

export class FetchOptions {
  searchMovies?: boolean = false;
  popularMovies?: boolean = true;
  topRatedMovies?: boolean = true;
  trendingMovies?: "day" | "week" | null = "day";
  searchShows?: boolean = true;
  popularShows?: boolean = true;
  topRatedShows?: boolean = true;
  trendingShows?: "day" | "week" | null = "day";
  clearAll?: boolean = true;
}

export default function useMoviesFetch(options = new FetchOptions()) {
  //states

  const [popularMovies, setPopularMovies] = useState(new Movies());
  const [topRatedMovies, setTopRatedMovies] = useState(new Movies());
  const [searchResultsMovies, setSearchResultsMovies] = useState(new Movies());
  const [trendingMovies, setTrendingMovies] = useState(new Movies());
  const [popularShows, setPopularShows] = useState(new Shows());
  const [topRatedShows, setTopRatedShows] = useState(new Shows());
  const [searchResultsShows, setSearchResultsShows] = useState(new Shows());
  const [trendingShows, setTrendingShows] = useState(new Shows());
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
    const page = popularMovies.page + 1;
    const newMovies = await API.fetchPopularMovies(page);

    setPopularMovies((prevMovies) => setter(prevMovies, newMovies, page));
  }

  async function loadTopRatedMovies() {
    const page = topRatedMovies.page + 1;
    const newMovies = await API.fetchTopMovies(page);
    setTopRatedMovies((prevMovies) => setter(prevMovies, newMovies, page));
  }
  async function loadSearchResultsMovies(searchTerm: string) {
    if (!searchTerm) {
      setSearchResultsMovies(new Movies());
      return;
    }
    const page = loadOptions.clearAll ? 1 : searchResultsMovies.page + 1;
    const newMovies = await API.searchMovies(searchTerm, page);
    setSearchResultsMovies((prevMovies) => setter(prevMovies, newMovies, page));
  }
  async function loadTrendingMovies(time_limit: "day" | "week") {
    const page = trendingMovies.page + 1;
    const newMovies = await API.fetchTrendingMovies(page, time_limit);
    setTrendingMovies((prevMovies) => setter(prevMovies, newMovies, page));
  }

  async function loadPopularShows() {
    const page = popularShows.page + 1;
    const newShows = await API.fetchPopularShows(page);
    setPopularShows((prevShows) => setter(prevShows, newShows, page));
  }

  async function loadTopRatedShows() {
    const page = topRatedShows.page + 1;
    const newShows = await API.fetchTopShows(page);
    setTopRatedShows((prevShows) => setter(prevShows, newShows, page));
  }
  async function loadSearchResultsShows(searchTerm: string) {
    if (!searchTerm) {
      setSearchResultsShows(new Shows());
      return;
    } // if no search term specified return empty object
    const page = loadOptions.clearAll ? 1 : searchResultsShows.page + 1;
    const newShows = await API.searchShows(searchTerm, page);
    setSearchResultsShows((prevShows) => setter(prevShows, newShows, page));
  }
  async function loadTrendingShows(time_limit: "day" | "week") {
    const page = trendingShows.page + 1;
    const newShows = await API.fetchTrendingShows(page, time_limit);
    setTrendingShows((prevShows) => setter(prevShows, newShows, page));
  }

  //other states
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadOptions, setLoadOptions] = useState<FetchOptions>({});

  useEffect(() => {
    fetchState(options); //fetch with initial option configuration
  }, []);

  useEffect(() => {
    if (Object.keys(loadOptions).length === 0) return; //if nothing to load then return
    fetchState(loadOptions);
    setLoadOptions({});
  }, [loadOptions]);

  //functions
  const fetchState = async (options: FetchOptions) => {
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
      if (options.searchMovies) {
        loadMore.loadSearchResultsMovies(searchTerm);
      }
      if (options.searchShows) {
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

function setter<T extends Movies | Shows>(
  prevState: T,
  newState: T,
  page: number
): T {
  return {
    ...newState,
    results:
      page > 1
        ? [...prevState.results, ...newState.results]
        : [...newState.results],
  };
}
