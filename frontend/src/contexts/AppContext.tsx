import React, { createContext, ReactNode, useContext, useReducer } from 'react';

export type UserData = {
  name: string;
  username: string;
  password: string;
  salt: string;
  isAdmin: boolean;
  isGuide: boolean;
  isTourist: boolean;
};

export type GuideData = UserData & {
  registryNumber: number;
  email: string;
  phone: string;
  active: boolean;
  isFirstLogin: boolean;
};

export type AppContextType = {
  state: ReducerState;
  setLoggedUser: (user: UserData | undefined) => void;
};

export type ReducerState = {
  loggedUser: UserData | undefined;
};

enum ActionTypes {
  SET_LOGGED_USER = 'SET_LOGGED_USER',
}

type Action = {
  type: string;
  payload: any;
};

const reducer = (prevState: ReducerState, action: Action): ReducerState => {
  switch (action.type) {
    case ActionTypes.SET_LOGGED_USER:
      return {
        ...prevState,
        loggedUser: action.payload,
      };
    default:
      return { ...prevState };
  }
};

const initialState = {
  state: {
    loggedUser: undefined,
  },
  setLoggedUser: () => null,
};

const AppContext = createContext<AppContextType>(initialState);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState.state);

  const boundSetLoggedUser = async (user: UserData | undefined) => {
    dispatch({
      type: ActionTypes.SET_LOGGED_USER,
      payload: user,
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setLoggedUser: boundSetLoggedUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => useContext(AppContext);
export { AppContextProvider, useAppContext };
