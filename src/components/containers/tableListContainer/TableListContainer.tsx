/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { list } from "../../../servicies/tableList";
import { Table } from "../../../utils/interfaces/tables/tables";
import { TableList } from "../../lists/tableList/TableList";
import { collection, addDoc, snapshotEqual } from "firebase/firestore";
import { db } from "../../firebase";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  push,
  onValue,
} from "firebase/database";

export const TableListContainer = () => {
  const [tableList, setTableList] = useState<Array<Table>>(list);
  const [tables, setTables] = useState<Table[]>([]);
  const [load, setload] = useState(false);

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
  useEffect(() => {
    const db = getDatabase();
    const tableListRef = ref(db, "tablesMock");
    const newList: Array<Table> = [];
    onValue(tableListRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData: any = childSnapshot.val();
        const elementId: number = childData.id;
        console.log("elementId: ", elementId);
        const isOcupped: boolean = childData.ocupped;
        console.log("isOcupped: ", isOcupped);
        const elementOrder: [] = childData.order;
        console.log("elementOrder: ", elementOrder);
        const newTable: Table = {
          id: elementId,
          open: isOcupped,
          order: elementOrder,
        };
        console.log("new table: ", newTable);
        newList.push(newTable);
        console.log("new list in each interaction: ", newList);
      });
    });
    setTables(newList);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <TableList listOfTables={tableList} />
      <button onClick={() => addTables(2, 1)}>createUser</button>
    </div>
  );
};
