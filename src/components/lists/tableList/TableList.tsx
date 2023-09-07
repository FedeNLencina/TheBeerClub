/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-for-in-array */
import React from "react";
import { TableComponent } from "../../table/TableComponent";
import { Table } from "../../../utils/interfaces/tables/tables";
import tableIcon from "../../../assets/icons/table.svg";

interface TableListProps {
  listOfKeys?: string[];
  listOfTables?: Table[];
}

export const TableList = ({ listOfTables, listOfKeys }: TableListProps) => {
  return (
    <div className="flex flex-row justify-start items-center">
      <div className="grid grid-cols-12 gap-4">
        {listOfTables &&
          listOfTables.map((table) => {
            console.log("table id in table list: ", table.id);
            return (
              <TableComponent
                key={table.number}
                table={table}
                iconUrl={tableIcon}
              />
            );
          })}
      </div>
    </div>
  );
};
