"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string | null;
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
  shippingPrice: number;
  shippingInsurance: number;
  serviceFee: number;
};
type OrderSummaryProps = {
  protection: number;               
  setProtection: (itemId: number) => void;
    refreshFetch:boolean;
};
export default function OrderSummary({ protection, refreshFetch}: OrderSummaryProps) {
  const {  status } = useSession();
  const router = useRouter();


  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => {
          if (data.orders && Array.isArray(data.orders)) {
            setOrders(data.orders);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [status,refreshFetch]);
console.log(refreshFetch)
  if (status === "loading" || loading) return <p>Loading...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  const allOrderItems = orders.flatMap((order) => order.orderItems);

  const totalQuantity = allOrderItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalProductPrice = allOrderItems.reduce(
    (acc, item) => acc + item.priceAtPurchase * item.quantity,
    0
  );
  const totalShipping = 5
  const shippingInsurance =6
  const serviceFees = 0.5
const grandTotal =
    totalProductPrice + totalShipping + shippingInsurance + serviceFees +protection;

    const handlePayMultiple = async (orderIds: number[]) => {
  try {
    const res = await fetch("/api/orders/pay", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderIds }),
    });

    if (!res.ok) throw new Error("Failed to pay orders");
console.log(`${orderIds.length} orders paid successfully!`);
 } catch (err) {
    console.error(err);
   console.log("Something went wrong");
  }
};

 const handlePayNow = () => {
   const orderIds = orders.map((order) => order.id);
  const query = encodeURIComponent(JSON.stringify(allOrderItems));
  router.push(`/checkout/summary?items=${query}`);
  handlePayMultiple(orderIds)
};
  return (
  <div className="bg-base p-4 md:p-6 rounded text-neutral-900 font-sans w-full md:w-[423] md:max-w-sm mx-auto">
  <h2 className="text-lg md:text-xl font-semibold mb-4">Total Product</h2>

  <div className="flex justify-between mb-1">
    <span className="text-neutral-900">Total Product Price ({totalQuantity} Item{totalQuantity !== 1 ? "s" : ""})</span>
    <span>${totalProductPrice.toFixed(2)}</span>
  </div>

  <div className="flex justify-between mb-1">
    <span>Total Shipping Price</span>
    <span>${totalShipping.toFixed(2)}</span>
  </div>

  <div className="flex justify-between mb-1">
    <span>Shipping Insurance</span>
    <span>${shippingInsurance.toFixed(2)}</span>
  </div>

  <div className="flex justify-between mb-1">
    <span>Product Protection</span>
    <span>${protection}</span>
  </div>

  <hr className="border-gray-700 my-4" />

  <h3 className="text-md font-semibold mb-2">Transaction Fees</h3>
  <div className="flex justify-between mb-6">
    <span>Service Fees</span>
    <span>${serviceFees.toFixed(2)}</span>
  </div>

  <div className="flex justify-between text-lg md:text-xl font-bold mb-6">
    <span>Grand total</span>
    <span>${grandTotal.toFixed(2)}</span>
  </div>

  <button
    onClick={handlePayNow}
    className="w-full py-2 md:py-3 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold"
  >
    Pay Now
  </button>
</div>
  );
}
