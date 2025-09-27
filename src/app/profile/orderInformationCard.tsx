"use client";
import React from "react";
import Bag from "@/components/icons/bag";
import { useState, useEffect } from "react";
type Product = {
  id: number;
  name: string;
  imageUrl?: string;
  price: number;
  category: { name: string };
};

type OrderItem = {
  id: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  product: Product;
  protection?: boolean;
};

type Order = {
  id: number;
  orderItems: OrderItem[];
  totalAmount: number;
  createdAt: string;
};

function OrderInformationCard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaidOrders = async () => {
      try {
        const res = await fetch("/api/orders/paid");
        if (!res.ok) throw new Error("Failed to fetch paid orders");

        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaidOrders();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (orders.length === 0) return <p>No paid orders found.</p>;

  return (
    <div className="flex w-full flex-col ">
      <div className="parent flex pb-8">
        <p className="pb-3 border-b basis-1/2 border-primary-500 text-primary-500">
          Transaction
        </p>
        <div></div>
      </div>
      <div className="w-full flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-[6px] border-gray-200 bg-base flex p-4"
          >
            <div>
              <Bag />
            </div>
            <div className=" flex flex-col px-4 gap-3.5 ">
            <div>
              <p>
                {order.createdAt.slice(0, 10)}
                {order.createdAt.slice(11, 16)}
              </p>
            </div>
          <div>
            <div>
              <p>{`Your order nr INV/208421205/TSR/3385-B${order.id}`}</p>
            </div>
            <div>
              {order.orderItems.map((item) => (
                <ul
                  key={item.id}
                  className="list-disc list-inside mt-2 space-y-1"
                >
                  <li>{item.product.name}</li>
                </ul>
              ))}
            </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderInformationCard;
