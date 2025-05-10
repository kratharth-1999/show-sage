import { useRef } from "react";

const useDebounceFetch = (cb, delay) => {
    const timeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    const debouncedFetch = (...args) => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            cb(signal, ...args);
        }, delay);
    };

    return debouncedFetch;
};

export default useDebounceFetch;
