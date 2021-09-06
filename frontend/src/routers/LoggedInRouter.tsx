import React from "react";

import { Redirect, Route } from "react-router-dom";

import {GuideData, useAppContext} from "../contexts/AppContext";
import AdminPage from "../features/admin/AdminPage";
import GuidePage from "../features/guide/GuidePage";
import GuideResetPasswordPage from "../features/guide/GuideResetPasswordPage";
import {RoleBasedRoute, Routes} from "../utils/routes";

const LoggedInRouter = () => {
  const {state: {loggedUser}} = useAppContext();

  let redirect: string = Routes.TOUR;

  if(loggedUser?.isAdmin) {
   redirect = Routes.ADMIN;
  } else if(loggedUser?.isGuide) {
    if((loggedUser as GuideData).isFirstLogin) {
      redirect = `${Routes.GUIDE}/reset_password`;
    } else {
      redirect = Routes.GUIDE;
    }
  }

  return (
    <>
      <RoleBasedRoute path={Routes.ADMIN} component={AdminPage} unlocked={loggedUser?.isAdmin}/>
      <RoleBasedRoute path={Routes.GUIDE} component={GuidePage} unlocked={loggedUser?.isGuide} exact />
      <RoleBasedRoute path={`${Routes.GUIDE}/reset_password`} component={GuideResetPasswordPage} unlocked={loggedUser?.isGuide} exact />
      <Redirect to={redirect} />
    </>
  );
};

export default LoggedInRouter;
