import { useState } from "react";

export const usePost = () => {
    const [postRequestState, setPostRequestState] = useState({
        data: null,
        postingData: false,
        postDataError: null,
    });

    const postData = async (url, body, headers = {}, options = {}) => {
        setPostRequestState({
            data: null,
            postingData: true,
            postDataError: null,
        });
        try {
            const responseSync = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${
                        import.meta.env.VITE_TMDB_API_KEY
                    }`,
                    ...headers,
                },
                body: JSON.stringify(body),
                ...options,
            });
            const response = await responseSync.json();
            if (!responseSync.ok) {
                throw new Error(
                    response.status_message ||
                        `HTTP error! status: ${responseSync.status}`
                );
            }
            setPostRequestState((prevState) => ({
                ...prevState,
                data: response,
            }));
        } catch (error) {
            setPostRequestState((prevState) => ({
                ...prevState,
                postDataError: error.message || String(error),
            }));
        } finally {
            setPostRequestState((prevState) => ({
                ...prevState,
                postingData: false,
            }));
        }
    };

    return {
        postRequestState,
        postData,
    };
};
