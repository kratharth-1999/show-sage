import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        trailerVideo: null,
        topRatedMovies: null,
        searchedMovies: null,
        trailerMovieId: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addSearchedMovies: (state, action) => {
            state.searchedMovies = action.payload;
        },
        addTrailerMovieId: (state, action) => {
            state.trailerMovieId = action.payload;
        },
    },
});

export const {
    addNowPlayingMovies,
    addTrailerVideo,
    addPopularMovies,
    addTopRatedMovies,
    addSearchedMovies,
    addTrailerMovieId,
} = moviesSlice.actions;

export default moviesSlice.reducer;
