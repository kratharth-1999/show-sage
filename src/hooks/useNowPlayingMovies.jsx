import useGet from "../hooks/useGet";
import { TMDB_MOVIE_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../store/slices/moviesSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useNowPlayingMovies = () => {
    const { stateOfGetRequest: nowPlayingMoviesRequest, getData } = useGet();
    const dispatch = useDispatch();

    useEffect(() => {
        getData(TMDB_MOVIE_BASE_URL + "/now_playing?page=1");
    }, []);

    useEffect(() => {
        if (!nowPlayingMoviesRequest.data) return;
        dispatch(addNowPlayingMovies(nowPlayingMoviesRequest.data.results));
    }, [nowPlayingMoviesRequest.data]);

    useEffect(() => {
        if (!nowPlayingMoviesRequest.getDataError) return;
        toast.error(nowPlayingMoviesRequest.getDataError);
    }, [nowPlayingMoviesRequest.getDataError]);

    return nowPlayingMoviesRequest;
};

export default useNowPlayingMovies;
