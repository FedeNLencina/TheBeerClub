import { createContext } from "react";

export interface TableContextProps {
  amountOfTables: number;
  setAmountOfTables: React.Dispatch<React.SetStateAction<number>>;
}

export const TableContext = createContext<TableContextProps>(
  {} as TableContextProps
);
