import React from "react";
import { Redirect, Route } from "react-router";
import LoginPage from "../features/login/LoginPage";
import { Routes } from "../utils/routes";

const LoggedOutRouter = () => {
  return (
    <>
      <Route path={Routes.LOGIN} component={LoginPage} />
      <Redirect to={Routes.LOGIN} />
    </>
  );
};

export default LoggedOutRouter;
