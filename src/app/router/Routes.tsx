import React from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetail from "../../features/activities/detail/ActivityDetail";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import HomePage from "../../features/home/HomePage";
import ProfileEditForm from "../../features/profiles/form/ProfileEditForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import LoginForm from "../../features/users/LoginForm";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "activities", element: <ActivityDashboard /> },
          { path: "createActivity", element: <ActivityForm key="create" /> },
          { path: "manage/:id", element: <ActivityForm key="manage" /> },
          { path: "activity/:id", element: <ActivityDetail /> },
          { path: "errors", element: <TestErrors /> },
          { path: "login", element: <LoginForm /> },
          { path: "profile/:username", element: <ProfilePage /> },
          { path: "editprofile", element: <ProfileEditForm /> },
        ],
      },
      { path: "server-error", element: <ServerError /> },
      { path: "notfound", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/notfound" /> },
    ],
  },
];
export const router = createBrowserRouter(routes);
