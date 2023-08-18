/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { list } from "../../../servicies/tableList";
import { Table } from "../../../utils/interfaces/tables/tables";
import { TableList } from "../../lists/tableList/TableList";
import { collection, addDoc, snapshotEqual } from "firebase/firestore";
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
  const [tables, setTables] = useState<Array<Table>>([]);
  const [load, setLoad] = useState(false);
  const [lastTableID, setLastTableID] = useState(0);

  const getTableList = async () => {
    try {
      setLoad(true);
      const db = await getDatabase();
      const tableListRef = await ref(db, "tablesMock");
      const newList: Table[] = [];
      onValue(tableListRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData: any = childSnapshot.val();
          if (childData) {
            const elementId: number = childData.id;
            //console.log("elementId: ", elementId);
            const isOcupped: boolean = childData.ocupped;
            //console.log("isOcupped: ", isOcupped);
            const newTable: Table = {
              id: elementId,
              open: isOcupped,
            };
            //console.log("new table: ", newTable);
            newList.push(newTable);
            setTables([...newList]);
            console.log("tables: ", tables);
          }
        });
      });
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  function addTables(amount: number, tableList: Table[]) {
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, "tablesMock");
    //agrego un nuevo elementos a esa lista (lo referencio asi al elemento y en el set le agrego las props.)
    const newTableRef = push(postListRef);
    if (tableList.length <= 0) {
      const newTable: Table = { id: 1, open: true };
      set(newTableRef, {
        id: 1,
        ocupped: newTable.open,
      });
    } else {
      const lastTable = tableList.length - 1;
      const lastId = tableList[lastTable].id;
      let nextId = lastId + 1;
      for (let i = 0; i < amount; i++) {
        const newTable: Table = { id: nextId, open: true };
        set(newTableRef, {
          id: nextId,
          ocupped: newTable.open,
        });
        nextId++;
        console.log("id: ", nextId);
        console.log("table onChildAdded :", newTable);
      }
    }
  }

  function addTable(table: Table) {
    setLoad(true);
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, "tablesMock");
    //agrego un nuevo elementos a esa lista (lo referencio asi al elemento y en el set le agrego las props.)
    const newTableRef = push(postListRef);
    set(newTableRef, {
      ocupped: table.open,
    })
      .then(() => {
        console.log("Elemento agregado con éxito a la lista.");
      })
      .catch((error) => {
        console.error("Error al agregar el elemento a la lista:", error);
      });
    setLoad(false);
  }

  useEffect(() => {
    getTableList();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <TableList listOfTables={tables} />
      <button onClick={() => addTables(1, tables)}>addtables</button>
    </div>
  );
};
