import React from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetail from "../../features/activities/detail/ActivityDetail";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import HomePage from "../../features/home/HomePage";
import ProfilePage from "../../features/profiles/ProfilePage";
import LoginForm from "../../features/users/LoginForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "createActivity", element: <ActivityForm key='create' /> },
      { path: "manage/:id", element: <ActivityForm key='manage' /> },
      { path: "activity/:id", element: <ActivityDetail /> },
      { path: "errors", element: <TestErrors /> },
      { path: "notfound", element: <NotFound /> },
      { path: "*", element: <Navigate replace to='/notfound' /> },
      { path: "login", element: <LoginForm /> },
      { path: "server-error", element: <ServerError /> },
      {path: "profile/:username", element: <ProfilePage />}
    ],
  },
];
export const router = createBrowserRouter(routes);
