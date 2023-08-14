export type Food = {
  name: string;
  price: number;
};

export type Order = {
  foodList: Food[];
};

export interface Table {
  id: number;
  open: boolean;
  order: [];
}
