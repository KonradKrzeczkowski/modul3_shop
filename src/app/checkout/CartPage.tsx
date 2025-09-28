"use client";

import { useEffect, useState } from "react";
import CartItemCard from "./cardItemCard";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  category: {
    name: string;
  };

};

type OrderItem = {
  id: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  product: Product;
};

type Order = {
  id: number;
  orderItems: OrderItem[];
};
type OrderSummaryProps = {
  protection: number;               
  setProtection: (itemId: number) => void;
      setRefreshFetch: () => void;  
   refreshFetch:boolean
};
export default function CartPage({ protection, setProtection,setRefreshFetch,refreshFetch }: OrderSummaryProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
console.log(orderItems)
const fetchOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();

      const allItems = data.orders.flatMap((order: Order) => order.orderItems);
      setOrderItems(allItems);
    };
  

useEffect(() => {
    

    fetchOrders();
  }, []);

  return (
    <div className="space-y-6  w-full " >
      {orderItems.map((item) => (
        <CartItemCard
          key={item.id}
            orderItemId={item.id}
          product={item.product}
          quantity={item.quantity}
          priceAtPurchase={item.priceAtPurchase}
          refreshData={fetchOrders}
          protection={protection}
          setProtection={setProtection}
          setRefreshFetch={setRefreshFetch}
          refreshFetch={refreshFetch}
        />
      ))}
    </div>
  );
}
