import React, { createContext, useState } from "react";

export default DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  console.log(index);
  return (
    <DataContext.Provider value={{ index, setIndex }}>
      {children}
    </DataContext.Provider>
  );
};
