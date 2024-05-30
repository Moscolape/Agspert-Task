export interface SaleOrderItem {
  sku_id: number;
  price: number;
  quantity: number;
}

export interface SaleOrder {
  customer_id: number;
  items: SaleOrderItem[];
  paid: boolean;
  invoice_no: string;
  invoice_date: string;
}

export const SaleOrders: SaleOrder[] = [
  {
    customer_id: 11908,
    items: [
      {
        sku_id: 220,
        price: 12,
        quantity: 12,
      },
      {
        sku_id: 221,
        price: 10,
        quantity: 5,
      },
    ],
    paid: false,
    invoice_no: "Invoice - 1212121",
    invoice_date: "7/5/2024",
  },
  {
    customer_id: 11909,
    items: [
      {
        sku_id: 222,
        price: 15,
        quantity: 3,
      },
      {
        sku_id: 223,
        price: 20,
        quantity: 2,
      },
    ],
    paid: true,
    invoice_no: "Invoice - 1212122",
    invoice_date: "8/5/2024",
  },
  {
    customer_id: 11910,
    items: [
      {
        sku_id: 224,
        price: 8,
        quantity: 10,
      },
      {
        sku_id: 225,
        price: 7,
        quantity: 4,
      },
    ],
    paid: false,
    invoice_no: "Invoice - 1212123",
    invoice_date: "9/5/2024",
  },
  {
    customer_id: 11911,
    items: [
      {
        sku_id: 226,
        price: 5,
        quantity: 20,
      },
      {
        sku_id: 227,
        price: 6,
        quantity: 6,
      },
    ],
    paid: true,
    invoice_no: "Invoice - 1212124",
    invoice_date: "10/5/2024",
  },
  {
    customer_id: 11912,
    items: [
      {
        sku_id: 228,
        price: 9,
        quantity: 9,
      },
      {
        sku_id: 229,
        price: 11,
        quantity: 8,
      },
    ],
    paid: false,
    invoice_no: "Invoice - 1212125",
    invoice_date: "11/5/2024",
  },
];