import React, { useState, useEffect } from "react";
import { OrderList } from "../../../servicies/orderList";
import { Table, Order } from "../../../utils/tables/tables";

export const TableListContainer = () => {
  const [tableList, setTableList] = useState<Array<Table>>([]);

  const loadTables = () => {
    const list: Table[] = [];
    const orderTable: Order = { foodList: OrderList };
    for (let i = 0; i < 10; i++) {
      const table: Table = { id: i, open: false, order: orderTable };
      list.push(table);
      //console.log("table: ", table);
    }
    console.log("list: ", list);
    setTableList(list);
    console.log("table list after set: ", tableList);
  };

  useEffect(() => {
    loadTables();
  }, []);

  return <div className="container mx-auto px-4"></div>;
};
