import { useState, useEffect, useRef } from "react";
//API
import API, { Show, Shows } from "../api/moviedb.api";

function defaultShowsObject(): Shows {
  return {
    page: 0,
    results: [] as Show[],
    total_pages: 0,
    total_results: 0,
  };
}
function defautState() {
  return {
    popularShows: defaultShowsObject(),
    topRatedShows: defaultShowsObject(),
    searchResultsShows: defaultShowsObject(),
    trendingShows: defaultShowsObject(),
  };
}

type FetchParams = {
  search?: boolean;
  popular?: boolean;
  topRated?: boolean;
  trending?: "day" | "week" | null;
};
export default function useShowsFetch(
  options: FetchParams = {
    search: false,
    popular: true,
    topRated: false,
    trending: null,
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
    fetchShows(1);
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;
    pageNumber.current++;
    fetchShows(pageNumber.current);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm]);

  //functions
  const fetchShows = async (page: number) => {
    try {
      setError(false);
      setLoading(true);
      let { popularShows, topRatedShows, searchResultsShows, trendingShows } =
        defautState();
      if (options.popular) {
        // popularShows = await API.fet(page);
      }
      if (options.topRated) {
        // topRatedMovies = await API.fetchTopMovies(page);
      }
      if (options.search && searchTerm) {
        searchResultsShows = await API.searchShows(searchTerm, page);
      }
      if (options.trending) {
        // trendingMovies = await API.fetchTrendingMovies(options.trending);
      }

      setState((prevState) => ({
        popularShows: {
          ...popularShows,
          results:
            page > 1
              ? [...prevState.popularShows.results, ...popularShows.results]
              : [...popularShows.results],
        },
        topRatedShows: {
          ...topRatedShows,

          results:
            page > 1
              ? [...prevState.topRatedShows.results, ...topRatedShows.results]
              : [...topRatedShows.results],
        },
        searchResultsShows: {
          ...searchResultsShows,
          results:
            page > 1
              ? [
                  ...prevState.searchResultsShows.results,
                  ...searchResultsShows.results,
                ]
              : [...searchResultsShows.results],
        },
        trendingShows: { ...trendingShows },
      }));
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  //return states
  return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
}
