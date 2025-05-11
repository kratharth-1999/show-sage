import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

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
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

export default Body;
