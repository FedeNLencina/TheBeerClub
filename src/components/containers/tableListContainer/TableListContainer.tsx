import React, { useState, useEffect } from "react";
import { list } from "../../../servicies/tableList";
import { Table } from "../../../utils/interfaces/tables/tables";
import { TableList } from "../../lists/tableList/TableList";

export const TableListContainer = () => {
  const [tableList, setTableList] = useState<Array<Table>>(list);

  return (
    <div className="container mx-auto px-4">
      <TableList listOfTables={tableList} />
    </div>
  );
};
