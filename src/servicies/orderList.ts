import { Food, Order } from "../utils/interfaces/tables/tables";

const comida1: Food = {
  name: "Fernet",
  price: 1000,
};
const comida2: Food = {
  name: "Patagonia",
  price: 1000,
};
const comida3: Food = {
  name: "Smirnoff",
  price: 1000,
};
const comida4: Food = {
  name: "Aconcahua",
  price: 1000,
};
const comida5: Food = {
  name: "Coca",
  price: 1000,
};
const comida6: Food = {
  name: "Agua",
  price: 1000,
};

const list = [comida1, comida2, comida3, comida4, comida5, comida6];

export const order: Order = { foodList: list };
