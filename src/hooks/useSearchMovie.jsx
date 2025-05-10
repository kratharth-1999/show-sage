import { TMDB_SEARCH_MOVIE_BASE_URL } from "../utils/constants";

const useSearchMovie = () => {
    const searchMovie = async (query) => {
        const movieResponse = await fetch(
            TMDB_SEARCH_MOVIE_BASE_URL +
                `?query=${query}&include_adult=false&page=1&language=en-US`,
            {
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${
                        import.meta.env.VITE_TMDB_API_KEY
                    }`,
                },
            }
        );
        const movie = await movieResponse.json();
        return movie.results;
    };

    return { searchMovie: searchMovie };
};

export default useSearchMovie;
