import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import ShowSageFallback from "./Fallback";

const Login = lazy(() => import("./Login"));
const Browse = lazy(() => import("./Browse"));

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/browse",
            element: <Browse />,
        },
    ]);

    return (
        <Suspense fallback={<ShowSageFallback />}>
            <RouterProvider router={appRouter} />
        </Suspense>
    );
};

export default Body;
