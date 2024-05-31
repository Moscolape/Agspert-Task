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
    features: "Enjoyable",
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
  {
    id: 210,
    display_id: 9,
    owner: 1080,
    name: "Warrior Sword",
    category: "Weapons",
    characteristics: "Sharp and durable",
    features: "Lightweight, ergonomic handle",
    brand: "Sword Master",
    sku: [],
    updated_on: "2024-02-17T12:46:41.995873Z",
    adding_date: "2024-02-17T12:46:41.995828Z",
  },
  {
    id: 211,
    display_id: 10,
    owner: 1081,
    name: "Healing Potion",
    category: "Potions",
    characteristics: "Restores health",
    features: "Quick action, long-lasting effect",
    brand: "Potion Pro",
    sku: [
      {
        id: 250,
        selling_price: 15,
        max_retail_price: 12,
        amount: 500,
        unit: "ml",
        quantity_in_inventory: 200,
        product: 211,
      },
    ],
    updated_on: "2024-04-04T12:46:41.995873Z",
    adding_date: "2024-04-04T12:46:41.995828Z",
  },
  {
    id: 212,
    display_id: 11,
    owner: 1082,
    name: "Dragon Armor",
    category: "Armor",
    characteristics: "High defense",
    features: "Fire-resistant, lightweight",
    brand: "Armor King",
    sku: [
      {
        id: 251,
        selling_price: 500,
        max_retail_price: 480,
        amount: 1,
        unit: "set",
        quantity_in_inventory: 20,
        product: 212,
      },
    ],
    updated_on: "2024-01-31T12:46:41.995873Z",
    adding_date: "2024-01-31T12:46:41.995828Z",
  },
  {
    id: 213,
    display_id: 12,
    owner: 1083,
    name: "Magic Wand",
    category: "Magic Items",
    characteristics: "Casts powerful spells",
    features: "Rechargeable, durable",
    brand: "Magic Craft",
    sku: [
      {
        id: 252,
        selling_price: 150,
        max_retail_price: 140,
        amount: 1,
        unit: "piece",
        quantity_in_inventory: 100,
        product: 213,
      },
    ],
    updated_on: "2024-03-24T12:46:41.995873Z",
    adding_date: "2024-03-24T12:46:41.995828Z",
  },
];