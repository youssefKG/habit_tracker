import { FC } from "react";
import { PropsWithChildren } from "react";
import DbContextProvider from "../dbContext";

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return <DbContextProvider>{children}</DbContextProvider>;
};

export default GlobalContextProvider;
