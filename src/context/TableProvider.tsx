import React, { useState } from "react";
import { TableContext } from "./TableContext";
import { Table } from "../utils/interfaces/tables/tables";

interface TableProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const TableProvider = ({ children }: TableProviderProps) => {
  const [amountOfTables, setAmountOfTables] = useState<number>(0);

  return (
    <TableContext.Provider value={{ amountOfTables, setAmountOfTables }}>
      {children}
    </TableContext.Provider>
  );
};
