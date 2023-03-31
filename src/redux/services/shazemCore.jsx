import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geniusApi = createApi({
  reducerPath: 'geniusApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://genius-song-lyrics1.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '168a6278dcmshb7a359d4e68d80ep1ebd14jsnd9a3ab3e454b');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/chart/songs/?time_period=month&per_page=15&page=1' }),
    getTopChartsByGenre: builder.query({ query: (genre) => `/chart/songs/?time_period=month&per_page=15&page=1&chart_genre=${genre}` }),
    getTopChartsByGenreAndTime: builder.query({ query: (params) => `/chart/songs/?time_period=${params.period}&per_page=15&page=1&chart_genre=${params.genre}` }),
    getTopArtists: builder.query({ query: () => '/chart/artists/?per_page=15&page=1' }),
    getSongDetails: builder.query({ query: (songid) => `/song/details/?id=${songid}` }),
    getSongRelated: builder.query({ query: (songid) => `/song/recommendations/?id=${songid}` }),
    getArtistDetails: builder.query({ query: (artistid) => `/artist/details/?id=${artistid}` }),
    getPopularSongsByArtist: builder.query({ query: (artistid) => `/artist/songs/?id=${artistid}&sort=popularity&perpage=10&page=1` }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search/?q=${searchTerm}&per_page=15&page=1` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetPopularSongsByArtistQuery,
  useGetTopArtistsQuery,
  useGetTopChartsByGenreQuery,
  useGetTopChartsByGenreAndTimeQuery,
  useGetSongsBySearchQuery,
} = geniusApi;
