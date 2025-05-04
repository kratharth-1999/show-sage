import useGet from "../hooks/useGet";
import { TMDB_MOVIE_BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/slices/moviesSlice";

const useMovieVideos = (movieId) => {
    const { stateOfGetRequest: movieVideosRequest, getData } = useGet();
    const dispatch = useDispatch();

    const fetchAndPushTrailerToStore = () => {
        const movieVideos = movieVideosRequest.data.results;
        const trailers = movieVideos.filter(
            (movie) => movie.type === "Trailer"
        );
        const trailer = !trailers.length ? movieVideos[0] : trailers[0];
        dispatch(addTrailerVideo(trailer));
    };

    useEffect(() => {
        getData(TMDB_MOVIE_BASE_URL + `/${movieId}/videos`);
    }, []);

    useEffect(() => {
        if (!movieVideosRequest.getDataError) return;
        toast.error(movieVideosRequest.getDataError);
    }, [movieVideosRequest.getDataError]);

    useEffect(() => {
        if (!movieVideosRequest.data) return;
        fetchAndPushTrailerToStore();
    }, [movieVideosRequest]);

    return movieVideosRequest;
};

export default useMovieVideos;
