// src/types/new-sale-order-modal.d.ts

declare module './components/modals/new-sale-order-modal' {
  import { FC } from 'react';

  interface Order {
    open: boolean;
    close: () => void;
  }

  const NewSaleOrder: FC<Order>;

  export default NewSaleOrder;
}
