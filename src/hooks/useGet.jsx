import { useState } from "react";

const useGet = () => {
    const [stateOfGetRequest, setStateOfGetRequest] = useState({
        data: null,
        gettingData: false,
        getDataError: null,
    });

    const getData = async (url, headers = {}, options = {}) => {
        setStateOfGetRequest((prevState) => ({
            ...prevState,
            data: null,
            gettingData: true,
            getDataError: null,
        }));
        try {
            const responseSync = await fetch(url, {
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${
                        import.meta.env.VITE_TMDB_API_KEY
                    }`,
                    ...headers,
                },
                ...options,
            });
            const response = await responseSync.json();
            if (!responseSync.ok) {
                throw new Error(
                    response.status_message ||
                        `HTTP error! status: ${responseSync.status}`
                );
            }
            setStateOfGetRequest((prevState) => ({
                ...prevState,
                data: response,
            }));
        } catch (error) {
            setStateOfGetRequest((prevState) => ({
                ...prevState,
                getDataError: error.message || String(error),
            }));
        } finally {
            setStateOfGetRequest((prevState) => ({
                ...prevState,
                gettingData: false,
            }));
        }
    };

    return {
        stateOfGetRequest,
        getData,
    };
};

export default useGet;
