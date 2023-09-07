/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
  remove,
  onChildAdded,
} from "firebase/database";

export const TableListContainer = () => {
  //const [tableList, setTableList] = useState<Array<Table>>(list);
  const [tables, setTables] = useState<Array<Table>>([]);
  const [load, setLoad] = useState(false);
  const [databaseListKeys, setDatabaseListKeys] = useState<Array<string>>([]);

  const getTableList = async () => {
    setLoad(true);
    const newTableList: Table[] = [];
    const newDatabaseKeyList: string[] = [];
    try {
      const db = await getDatabase();
      if (db) {
        const tableListRef = await ref(db, "tablesMock");
        if (!tableListRef) {
          setLoad(false);
        } else {
          onValue(
            tableListRef,
            (snapshot) => {
              snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData: Table = childSnapshot.val();
                const newTable: Table = childData;
                newTable.id = childKey;
                newTableList.push(newTable);
                newDatabaseKeyList.push(childKey);
                setTables([...newTableList]);
                setDatabaseListKeys([...newDatabaseKeyList]);
              });
            },
            {
              onlyOnce: true,
            }
          );
        }
      }
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addTables = (amount: number, tableList: Table[]) => {
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, "tablesMock");
    //agrego un nuevo elemento a esa lista (lo referencio asi al elemento y en el set le agrego las props.)
    const newTableRef = push(postListRef);
    const numberOfTables = tableList.length;
    if (numberOfTables <= 0) {
      const newTable: Table = { id: "", number: 1, ocupped: true };
      set(newTableRef, {
        number: newTable.number,
        ocupped: newTable.ocupped,
      });
      console.log("table added: ", newTable);
      setTables([...tables, newTable]);
      console.log("tables: ", tables);
    } else {
      let amountTablesAdded = 0;
      const lastTable = numberOfTables - 1;
      const lastId = tableList[lastTable].number;
      let nextId = lastId + 1;
      for (let i = 0; i < amount; i++) {
        const newTable: Table = { id: "", number: nextId, ocupped: true };
        set(newTableRef, {
          number: newTable.number,
          ocupped: newTable.ocupped,
        });
        console.log("table added: ", newTable);
        nextId++;
        amountTablesAdded++;
        setTables([...tables, newTable]);
        console.log("tables: ", tables);
      }
    }
  };

  const removeTables = () => {
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, "tablesMock");
    remove(postListRef)
      .then(() => {
        setTables([]);
        console.log("Lista de tablas eliminada correctamente");
      })
      .catch((error) => {
        console.error("Error al eliminar la lista de tablas:", error);
      });
  };

  useEffect(() => {
    getTableList();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {load && tables.length === 0 && <div> Cargando</div>}
      {tables.length === 0 && !load && (
        <>
          <div>No hay mesas aun</div>
          <button onClick={() => addTables(1, tables)}>addtables</button>
        </>
      )}
      {tables.length !== 0 && !load && (
        <>
          <TableList listOfTables={tables} />
          <button onClick={() => addTables(1, tables)}>addtables</button>
          <br></br>
          <button onClick={() => removeTables()}>remove Tables</button>
        </>
      )}
    </div>
  );
};
