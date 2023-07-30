/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-for-in-array */
import React, { useEffect, useState } from "react";
import { TableComponent } from "../../table/TableComponent";

export const TableList = (listOfTables: []) => {
  return (
    <div className="flex justify-start items-cente">
      <div className="grid grid-cols-4 gap-4">
        {listOfTables.map((table) => {
          return <TableComponent table={table} />;
        })}
      </div>
    </div>
  );
};
