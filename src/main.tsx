import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./pages/layout.page.tsx";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import StarredStoriesPage from "./pages/starred-stories.page.tsx";
import TopStoriesPage from "./pages/top-stories.page.tsx";
import store from "./store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TopStoriesPage />,
      },
      {
        path: "/starred",
        element: <StarredStoriesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
