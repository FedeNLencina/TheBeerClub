/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-for-in-array */
import React, { useEffect, useState } from "react";
import { TableComponent } from "../../table/TableComponent";
import { Table } from "../../../utils/interfaces/tables/tables";
import { TableIcon } from "../../../utils/types/icon";
import tableIcon from "../../../assets/icons/table.svg";
import { getDatabase, ref, push, set } from "firebase/database";

interface TableListProps {
  listOfTables?: Table[];
}

export const TableList = ({ listOfTables }: TableListProps) => {
  const [load, setload] = useState(false);

  // console.log(
  //   "list of tables as porps ijn table list compoennt: ",
  //   listOfTables
  // );
  return (
    <div className="flex flex-row justify-start items-center">
      <div className="grid grid-cols-12 gap-4">
        {listOfTables &&
          listOfTables.map((table) => {
            return (
              <TableComponent
                key={table.id}
                table={table}
                iconUrl={tableIcon}
              />
            );
          })}
      </div>
    </div>
  );
};
