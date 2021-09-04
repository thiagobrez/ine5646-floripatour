import React, {useEffect} from "react";

import { Route } from "react-router-dom";

import LoginPage from "../features/login/LoginPage";
import { RoleBasedRoute, Routes } from "../utils/routes";
import LoggedInRouter from "./LoggedInRouter";

import styled from 'styled-components/macro';
import LoggedOutRouter from "./LoggedOutRouter";
import { useAppContext } from "../contexts/AppContext";

const Container = styled.div`
  height: 100%;
`;

const AppRouter = () => {
  const {state: {loggedUser}, setLoggedUser} = useAppContext();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');

    if(storedUser) {
      setLoggedUser(JSON.parse(storedUser));
    }
  }, [])

  return (
    <Container>
      <Route
        path={Routes.ROOT}
        component={!!loggedUser ? LoggedInRouter : LoggedOutRouter}
      />
    </Container>
  );
};

export default AppRouter;
