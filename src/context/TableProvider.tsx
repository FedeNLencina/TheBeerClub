import React, { useState } from "react";
import { TableContext } from "./TableContext";
import { Table } from "../utils/interfaces/tables/tables";

interface TableProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const TableProvider = ({ children }: TableProviderProps) => {
  const [tables, setTables] = useState<Array<Table>>([]);

  return <TableContext.Provider value={{}}>{children}</TableContext.Provider>;
};
