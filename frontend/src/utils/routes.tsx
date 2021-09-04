import React from "react";

import { Route, RouteComponentProps } from "react-router-dom";
import type { RouteProps } from "react-router-dom";

import NotFoundPage from "../features/404/NotFoundPage";

interface RoleBasedRouteParams extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  unlocked?: boolean;
}

export enum Routes {
  ROOT = "/",
  HOME = "/home",
  LOGIN = "/login",
}

export const RoleBasedRoute = ({
  component: Component,
  unlocked = true,
  ...rest
}: RoleBasedRouteParams) => {
  const renderRoute = (props: RouteComponentProps<any>) => {
    // if (!keycloak?.authenticated)
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: Routes.LOGIN,
    //         state: { from: props.location },
    //       }}
    //     />
    //   );

    if (unlocked) {
      return <Component {...props} />;
    } else {
      return <NotFoundPage />;
    }
  };

  return <Route {...rest} render={renderRoute} />;
};
