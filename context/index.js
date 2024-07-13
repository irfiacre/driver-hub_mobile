import React, { createContext, useState } from "react";

const initialState = {
  key: "",
  application: {},
  user: {},
};

const AppContext = createContext(undefined);

const AppContextProvider = ({ children }) => {
  const [contextState, setContextState] = useState(initialState);

  const updateContextState = (newContextState) => {
    setContextState((prevContextState) => ({
      ...prevContextState,
      ...newContextState,
    }));
  };

  return (
    <AppContext.Provider value={{ contextState, updateContextState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
