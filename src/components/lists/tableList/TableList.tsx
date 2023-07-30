/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-for-in-array */
import React, { useEffect, useState } from "react";
import { TableComponent } from "../../table/TableComponent";
import { Table } from "../../../utils/tables/tables";

interface TableListProps {
  listOfTables?: Table[];
}

export const TableList = ({ listOfTables }: TableListProps) => {
  console.log(
    "list of tables as porps ijn table list compoennt: ",
    listOfTables
  );
  return (
    <div className="flex justify-start items-center">
      <div className="grid grid-cols-4 gap-4">
        {listOfTables &&
          listOfTables.map((table) => {
            return <TableComponent key={table.id} table={table} />;
          })}
      </div>
    </div>
  );
};
