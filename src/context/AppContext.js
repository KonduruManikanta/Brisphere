import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
    roomsCount: 1,
  });
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
 