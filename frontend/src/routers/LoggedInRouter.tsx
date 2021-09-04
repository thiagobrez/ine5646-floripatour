import React from "react";
import { Redirect, Route } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import LoginPage from "../features/login/LoginPage";
import { Routes } from "../utils/routes";

const LoggedInRouter = () => {
  return (
    <>
      <Route path={Routes.HOME} component={HomePage} />
      <Redirect to={Routes.HOME} />
    </>
  );
};

export default LoggedInRouter;
