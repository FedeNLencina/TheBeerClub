import { Table } from "../utils/interfaces/tables/tables";
import { order } from "./orderList";

const table1: Table = {
  id: 1,
  open: true,
  order: order,
};
const table2: Table = {
  id: 2,
  open: false,
  order: order,
};
const table3: Table = {
  id: 3,
  open: true,
  order: order,
};
const table4: Table = {
  id: 4,
  open: false,
  order: order,
};
const table5: Table = {
  id: 5,
  open: false,
  order: order,
};

export const list = [table1, table2, table3, table4, table5];
