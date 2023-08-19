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
  //const [tableList, setTableList] = useState<Array<Table>>(list);
  const [tables, setTables] = useState<Array<Table>>([]);
  const [load, setLoad] = useState(false);
  const [lastTableID, setLastTableID] = useState(0);
  const [tablesAmount, setTablesAmount] = useState(0);

  const getTableList = async () => {
    try {
      setLoad(true);
      const db = await getDatabase();
      const tableListRef = await ref(db, "tablesMock");
      const newList: Table[] = [...tables];
      //console.log("new list: ", newList);
      onValue(tableListRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData: Table = childSnapshot.val();
          if (childData) {
            const elementId: number = childData.id;
            //console.log("elementId: ", elementId);
            const isOcupped: boolean = childData.ocupped;
            //console.log("isOcupped: ", isOcupped);
            const newTable: Table = {
              id: elementId,
              open: isOcupped,
            };
            newList.push(newTable);
            setTables([...newList]);
            console.log("tables: ", tables);
            // console.log("new list: ", newList);
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
    const numberOfTables = tableList.length;
    if (numberOfTables <= 0) {
      const newTable: Table = { id: 1, open: true };
      set(newTableRef, {
        id: newTable.id,
        ocupped: newTable.open,
      });
      console.log("al estar vacia la lista entro aca: ", newTable);
      console.log("newTable: ", newTable);
      console.log("newTable id: ", newTable.id);
      setTablesAmount(tablesAmount + 1);
    } else {
      let amountTablesAdded = 0;
      const lastTable = numberOfTables - 1;
      //console.log("last table: ", lastTable);
      const lastId = tableList[lastTable].id;
      //console.log("lastid: ", lastId);
      let nextId = lastId + 1;
      //console.log("nextId: ", nextId);
      for (let i = 0; i < amount; i++) {
        const newTable: Table = { id: nextId, open: true };
        set(newTableRef, {
          id: newTable.id,
          ocupped: newTable.open,
        });
        console.log("al NO estar vacia la lista entro aca: ", newTable);
        console.log("newTable: ", newTable);
        console.log("newTable id: ", newTable.id);
        nextId++;
        amountTablesAdded++;
        setTablesAmount(tablesAmount + numberOfTables + amountTablesAdded);
        //console.log("nextId after a loop: ", nextId);
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
      {tables ? (
        <>
          <TableList listOfTables={tables} />
          <button onClick={() => addTables(1, tables)}>addtables</button>
        </>
      ) : (
        <>
          <div>No hay mesas aun</div>
        </>
      )}
    </div>
  );
};
