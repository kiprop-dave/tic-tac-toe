import { useState, useEffect, createContext } from "react";
import data from "../utils/matrix";

interface AppContext {}

const Context = createContext<AppContext | null>(null);

interface contextProps {
  children: React.ReactNode;
}
function ContextProvider({ children }: contextProps) {
  const values = {};
  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export { ContextProvider, Context };
