import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";

import Header from "./components/Header/Header";
import { AppContextProvider } from "./contexts/AppContext";
import AppRouter from "./routers/AppRouter";
import theme, { Styles } from "./utils/theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <Styles />
          <Router>
            <Header />
            <AppRouter />
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </AppContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
