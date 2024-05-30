export interface SKU {
  id: number;
  selling_price: number;
  max_retail_price: number;
  amount: number;
  unit: string;
  quantity_in_inventory: number;
  product: number;
}

export interface Product {
  id: number;
  display_id: number;
  owner: number;
  name: string;
  category: string;
  characteristics: string;
  features: string;
  brand: string;
  sku: SKU[];
  updated_on: string;
  adding_date: string;
}

export const Products: Product[] = [
  {
    id: 209,
    display_id: 8,
    owner: 1079,
    name: "New Product",
    category: "The god of War",
    characteristics: "New Product Characteristics",
    features: "",
    brand: "New Product Brand",
    sku: [
      {
        id: 248,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 209,
      },
      {
        id: 247,
        selling_price: 32,
        max_retail_price: 32,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 209,
      },
      {
        id: 246,
        selling_price: 23,
        max_retail_price: 21,
        amount: 22,
        unit: "kg",
        quantity_in_inventory: 1,
        product: 209,
      },
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z",
  },
];