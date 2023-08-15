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

  useEffect(() => {}, [load]);

  function addTables(amount: number, lastTableId: number) {
    setload(true);
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, "tablesMock");
    //agrego un nuevo elementos a esa lista (lo referencio asi al elemento y en el set le agrego las props.)
    const newTableRef = push(postListRef);
    let nextId = lastTableId + 1;
    for (let i = 0; i < amount; i++) {
      const newTable: Table = { id: nextId, open: true, order: [] };
      set(newTableRef, {
        id: nextId,
        ocupped: newTable.open,
        order: newTable.order,
      });
      nextId++;
      console.log("id: ", nextId);
      console.log("table onChildAdded :", newTable);
    }

    setload(false);
  }

  function addTable(table: Table) {
    setload(true);
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, "tablesMock");
    //agrego un nuevo elementos a esa lista (lo referencio asi al elemento y en el set le agrego las props.)
    const newTableRef = push(postListRef);
    set(newTableRef, {
      ocupped: table.open,
      order: table.order,
    })
      .then(() => {
        console.log("Elemento agregado con éxito a la lista.");
      })
      .catch((error) => {
        console.error("Error al agregar el elemento a la lista:", error);
      });
    setload(false);
  }
  console.log(
    "list of tables as porps ijn table list compoennt: ",
    listOfTables
  );
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
