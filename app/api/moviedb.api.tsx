import axiosCreator from "axios";
import {
  MOVIE_API_URL,
  MOVIE_API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
} from "../config/config";

const axios = axiosCreator.create({
  baseURL: MOVIE_API_URL,
});
//set axios configuration
axios.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["api_key"] = MOVIE_API_KEY;
  config.params["language"] = "en-US";
  return config;
});
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    throw error;
  }
);

const defaultConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

//Types
export type Movie = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  runtime: number;
  revenue: number;
};
export type Movies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Cast = {
  character: string;
  credit_id: number;
  name: string;
  profile_path: string;
};
export type Crew = {
  job: string;
  name: string;
  credit_id: number;
};
export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};
export type Videos = {
  id: number; //movie id
  results: Video[];
};

//TV Shows
export type Shows = {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
};
export type Show = {
  backdrop_path: string | null;
  poster_path: string | null;
  id: number;
  vote_average: number;
  overview: string;
  name: string;
  original_name: string;
  original_language: string;
  popularity: number;
  vote_count: number;
  first_air_date: string;
};

const apiSettings = {
  fetchTopMovies: async (page: number): Promise<Movies> => {
    return await (
      await axios.get("movie/top_rated")
    ).data;
  },
  fetchPopularMovies: async (page: number): Promise<Movies> => {
    return await (
      await axios.get(`movie/popular?page=${page}`)
    ).data;
  },
  fetchTrendingMovies: async (time_window: "day" | "week"): Promise<Movies> => {
    return await (
      await axios.get(`trending/movie/${time_window}`)
    ).data;
  },
  searchMovies: async (searchTerm: string, page: number): Promise<Movies> => {
    return await (
      await axios.get(`search/movie?query=${searchTerm}&page=${page}`)
    ).data;
  },
  fetchMovie: async (movieId: number): Promise<Movie> => {
    return await (
      await axios.get(`movie/${movieId}`)
    ).data;
  },
  fetchSimilarMovies: async (movieId: number): Promise<Movies> => {
    return await (
      await axios.get(`movie/${movieId}/similar`)
    ).data;
  },
  fetchLatestMovie: async (): Promise<Movie> => {
    return await (
      await axios.get("movie/latest")
    ).data;
  },
  fetchVideos: async (movieId: number): Promise<Videos> => {
    return await (
      await axios.get(`movie/${movieId}/videos`)
    ).data;
  },
  fetchCredits: async (movieId: number): Promise<Credits> => {
    return await (
      await axios.get(`movie/${movieId}/credits`)
    ).data;
  },
  //TV SHOWS
  searchShows: async (searchTerm: string, page: number): Promise<Shows> => {
    return await (
      await axios.get(`/search/tv?query=${searchTerm}&page=${page}`)
    ).data;
  },
  // Bonus material below for login
  getRequestToken: async () => {
    const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
    return reqToken.request_token;
  },
  authenticate: async (
    requestToken: string,
    username: string,
    password: string
  ) => {
    const bodyData = {
      username,
      password,
      request_token: requestToken,
    };
    // First authenticate the requestToken
    const data = await (
      await fetch(LOGIN_URL, {
        ...defaultConfig,
        body: JSON.stringify(bodyData),
      })
    ).json();
    // Then get the sessionId with the requestToken
    if (data.success) {
      const sessionId = await (
        await fetch(SESSION_ID_URL, {
          ...defaultConfig,
          body: JSON.stringify({ request_token: requestToken }),
        })
      ).json();
      return sessionId;
    }
  },
  rateMovie: async (sessionId: string, movieId: number, value: number) => {
    const endpoint = `${MOVIE_API_URL}movie/${movieId}/rating?api_key=${MOVIE_API_KEY}&session_id=${sessionId}`;

    const rating = await (
      await fetch(endpoint, {
        ...defaultConfig,
        body: JSON.stringify({ value }),
      })
    ).json();

    return rating;
  },
};

export default apiSettings;
