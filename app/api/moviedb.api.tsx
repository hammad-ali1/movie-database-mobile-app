import axios from "axios";
import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  TOP_BASE_URL,
  MOVIE_API_URL,
  MOVIE_API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
} from "../config/config";

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

const apiSettings = {
  fetchTopMovies: async (searchTerm: string, page: number): Promise<Movies> => {
    const endpoint = `${TOP_BASE_URL}&page=${page}&language=en-US`;

    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchPopularMovies: async (
    searchTerm: string,
    page: number
  ): Promise<Movies> => {
    const endpoint: string = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
      : `${POPULAR_BASE_URL}&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchMovie: async (movieId: number): Promise<Movie> => {
    const endpoint: string = `${MOVIE_API_URL}movie/${movieId}?api_key=${MOVIE_API_KEY}`;
    return await (await fetch(endpoint)).json();
  },
  fetchSimilarMovies: async (movieId: number): Promise<Movies> => {
    const endpoint: string = `${MOVIE_API_URL}movie/${movieId}/similar?api_key=${MOVIE_API_KEY}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchLatestMovie: async (): Promise<Movie> => {
    const endpoint: string = `${MOVIE_API_URL}movie/latest?api_key=${MOVIE_API_KEY}&language=en-US`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchVideos: async (movieId: number): Promise<Videos> => {
    const endpoint: string = `${MOVIE_API_URL}movie/${movieId}/videos?api_key=${MOVIE_API_KEY}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchCredits: async (movieId: number): Promise<Credits> => {
    const creditsEndpoint: string = `${MOVIE_API_URL}movie/${movieId}/credits?api_key=${MOVIE_API_KEY}`;
    return await (await fetch(creditsEndpoint)).json();
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
