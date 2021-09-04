import React, {useEffect} from "react";

import { Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components/macro';

import { useAppContext } from "../contexts/AppContext";
import { Routes } from "../utils/routes";
import LoggedInRouter from "./LoggedInRouter";
import LoggedOutRouter from "./LoggedOutRouter";

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

      <ToastContainer />
    </Container>
  );
};

export default AppRouter;
