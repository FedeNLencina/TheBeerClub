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
} from "firebase/database";

export const TableListContainer = () => {
  //const [tableList, setTableList] = useState<Array<Table>>(list);
  const [tables, setTables] = useState<Array<Table>>([]);
  const [load, setLoad] = useState(false);
  const [tablesAmount, setTablesAmount] = useState(0);

  const getTableList = async () => {
    setLoad(true);
    const newTableList: Table[] = [];
    try {
      const db = await getDatabase();
      if (db) {
        const tableListRef = await ref(db, "tablesMock");
        if (!tableListRef) {
          setTablesAmount(0);
          setLoad(false);
        } else {
          onValue(
            tableListRef,
            (snapshot) => {
              snapshot.forEach((childSnapshot) => {
                const childData: Table = childSnapshot.val();
                const newTable: Table = childData;
                newTableList.push(newTable);
                setTables([...newTableList]);
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
      const newTable: Table = { id: 1, ocupped: true };
      set(newTableRef, {
        id: newTable.id,
        ocupped: newTable.ocupped,
      });
      setTables([...tables, newTable]);
      setTablesAmount(tablesAmount + 1);
    } else {
      let amountTablesAdded = 0;
      const lastTable = numberOfTables - 1;
      const lastId = tableList[lastTable].id;
      let nextId = lastId + 1;
      for (let i = 0; i < amount; i++) {
        const newTable: Table = { id: nextId, ocupped: true };
        set(newTableRef, {
          id: newTable.id,
          ocupped: newTable.ocupped,
        });
        nextId++;
        amountTablesAdded++;
        setTablesAmount(tablesAmount + amountTablesAdded);
        setTables([...tables, newTable]);
      }
    }
  };

  const removeTables = () => {
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, "tablesMock");
    remove(postListRef)
      .then(() => {
        setTablesAmount(0);
        setTables([]);
        console.log("Lista de tablas eliminada correctamente");
      })
      .catch((error) => {
        console.error("Error al eliminar la lista de tablas:", error);
      });
  };

  useEffect(() => {
    getTableList();
  }, [tablesAmount]);

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
