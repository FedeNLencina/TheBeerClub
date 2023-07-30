/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Table } from "../../utils/tables/tables";

interface TableProps {
  table: Table;
}

export const TableComponent = ({ table }: TableProps) => {
  console.log("Table state: ", table.open);

  return (
    <div>
      <h1>tablas</h1>
      <h1>{table.open}</h1>
    </div>
  );
};
