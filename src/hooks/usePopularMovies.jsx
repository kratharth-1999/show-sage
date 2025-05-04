import useGet from "../hooks/useGet";
import { TMDB_MOVIE_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../store/slices/moviesSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const usePopularMovies = () => {
    const { stateOfGetRequest: popularMoviesRequest, getData } = useGet();
    const dispatch = useDispatch();

    useEffect(() => {
        getData(TMDB_MOVIE_BASE_URL + "/popular");
    }, []);

    useEffect(() => {
        if (!popularMoviesRequest.data) return;
        dispatch(addPopularMovies(popularMoviesRequest.data.results));
    }, [popularMoviesRequest.data]);

    useEffect(() => {
        if (!popularMoviesRequest.getDataError) return;
        toast.error(popularMoviesRequest.getDataError);
    }, [popularMoviesRequest.getDataError]);

    return popularMoviesRequest;
};

export default usePopularMovies;
