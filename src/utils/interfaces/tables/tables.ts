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
  //order: any[];
}


//Orders van a ser otra lista aparte y se le suma a una mesa cuando se abra