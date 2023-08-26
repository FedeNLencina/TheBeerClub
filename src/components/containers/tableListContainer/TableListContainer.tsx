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
  const [databaseKeys, setDatabaseKeys] = useState<Array<string>>([]);
  const [tableIds, setTableIds] = useState<Array<number>>([]);
  const [load, setLoad] = useState(false);
  const [tablesAmount, setTablesAmount] = useState(0);

  const getTableList = async () => {
    setLoad(true);
    const newTableList: Table[] = [];
    const newIdList: number[] = [];
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
                const childKey = childSnapshot.key;
                const childData: Table = childSnapshot.val();
                if (childKey && childData) {
                  const keyIdExist = keyExits(databaseKeys, childKey);
                  if (!keyIdExist) {
                    setDatabaseKeys([...databaseKeys, childKey]);
                    const newTable: Table = childData;
                    const tableExists = tableIdExists(tableIds, newTable.id);
                    if (!tableExists) {
                      newTableList.push(newTable);
                      newIdList.push(newTable.id);
                      setTableIds([...newIdList]);
                      setTables([...newTableList]);
                    }
                  }
                }
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

  const keyExits = (idList: string[], key: string): boolean => {
    return idList.includes(key);
  };

  const tableIdExists = (tableList: number[], id: number): boolean => {
    return tableList.includes(id);
  };

  const addTables = (amount: number, tableList: Table[]) => {
    const db = getDatabase();
    // referencio a la lista en la base de datos
    const postListRef = ref(db, "tablesMock");
    //agrego un nuevo elementos a esa lista (lo referencio asi al elemento y en el set le agrego las props.)
    const newTableRef = push(postListRef);
    const numberOfTables = tableList.length;
    if (numberOfTables <= 0) {
      const newTable: Table = { id: 1, ocupped: true };
      set(newTableRef, {
        id: newTable.id,
        ocupped: newTable.ocupped,
      });
      setTableIds([...tableIds, newTable.id]);
      setTables([...tables, newTable]);
      console.log("al estar vacia la lista entro aca: ", newTable);
      console.log("newTable: ", newTable);
      console.log("newTable id: ", newTable.id);
      setTablesAmount(tablesAmount + 1);
    } else {
      let amountTablesAdded = 0;
      const lastTable = numberOfTables - 1;
      console.log("amountTablesAdded: ", amountTablesAdded);
      const lastId = tableList[lastTable].id;
      //console.log("lastid: ", lastId);
      let nextId = lastId + 1;
      //console.log("nextId: ", nextId);
      for (let i = 0; i < amount; i++) {
        const newTable: Table = { id: nextId, ocupped: true };
        set(newTableRef, {
          id: newTable.id,
          ocupped: newTable.ocupped,
        });
        console.log("al NO estar vacia la lista entro aca: ", newTable);
        console.log("newTable: ", newTable);
        console.log("newTable id: ", newTable.id);
        nextId++;
        amountTablesAdded++;
        console.log("amountTablesAdded: ", amountTablesAdded);
        setTablesAmount(tablesAmount + amountTablesAdded);
        setTableIds([...tableIds, newTable.id]);
        setTables([...tables, newTable]);
        //console.log("nextId after a loop: ", nextId);
      }
    }
  };

  useEffect(() => {
    getTableList();
  }, [load]);
  console.log("tableIds: ", tableIds);
  console.log("tables: ", tables);

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
        </>
      )}
    </div>
  );
};
