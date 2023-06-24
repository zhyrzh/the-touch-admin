import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
