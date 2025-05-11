import useGet from "../hooks/useGet";
import { TMDB_MOVIE_BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    addTrailerVideo,
    addTrailerMovieId,
} from "../store/slices/moviesSlice";

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
        dispatch(addTrailerMovieId(movieId));
    };

    useEffect(() => {
        if (!movieId) return;
        getData(TMDB_MOVIE_BASE_URL + `/${movieId}/videos`);
    }, [movieId]);

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
