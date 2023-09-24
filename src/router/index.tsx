import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/login";
import AddArticle from "../pages/article/add";
import SetupProfile from "../pages/user/setup-profile";
import Register from "../pages/auth/register";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/user/setup-profile",
    element: <SetupProfile />,
  },
  {
    path: "/article/add",
    element: <AddArticle />,
  },
];
