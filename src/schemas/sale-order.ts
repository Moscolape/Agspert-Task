export interface SaleOrderItem {
  sku_id: number;
  price: number;
  quantity: number;
}

export interface SaleOrder {
  customer_id: number;
  customer_name: string;
  items: SaleOrderItem[];
  paid: boolean;
  invoice_no: string;
  invoice_date: string;
}

export const SaleOrders: SaleOrder[] = [
  {
    customer_id: 11908,
    customer_name: 'Vishtu',
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
    invoice_date: "2024-05-24T02:46:41.995828Z",
  },
  {
    customer_id: 11909,
    customer_name: 'Kareem',
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
    invoice_date: "2024-02-17T20:17:41.995828Z",
  },
  {
    customer_id: 11910,
    customer_name: 'Zanjeer',
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
    invoice_date: "2024-04-04T10:29:41.995828Z",
  },
  {
    customer_id: 11911,
    customer_name: 'John Doe',
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
    invoice_date: "2024-01-31T22:22:41.995828Z",
  },
  {
    customer_id: 11912,
    customer_name: 'Mary Jane',
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
    invoice_date: "2024-03-24T20:45:41.995828Z",
  },
];