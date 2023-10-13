import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Login from "./routes/Login.jsx";
import SignUp from "./routes/SignUp.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blogs from "./routes/Blogs.jsx";
import IndividualBlog from "./routes/IndividualBlog.jsx";
import Profile from "./routes/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Blogs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "blogs/:id",
        element: <IndividualBlog />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
    // children: [
    //   {
    //     path: "/",
    //     element: <Home />,
    //   },
    //   {
    //     path: "shop",
    //     element: <Shop />,
    //   },
    //   {
    //     path: "about",
    //     element: <About />,
    //   },
    //   {
    //     path: "cart",
    //     element: <Cart />,
    //   },
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
