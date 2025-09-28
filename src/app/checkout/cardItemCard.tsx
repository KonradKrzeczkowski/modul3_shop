"use client";

import { useState } from "react";
import Image from "next/image";
import Checkbox from "@/components/checkbox";
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string | null;
  stock: number;
  category: {
    name: string;
  };
};

type CartItemCardProps = {
  orderItemId: number;
  product: Product;
  quantity: number;
  priceAtPurchase: number;
  refreshData: () => void;
  protection: number;
  setProtection: (itemId: number) => void;
  setRefreshFetch: (itemId: boolean) => void;
  refreshFetch: boolean;
};

export default function CartItemCard({
  orderItemId,
  product,
  quantity,
  protection,
  setProtection,
  refreshData,
  setRefreshFetch,
  refreshFetch,
}: CartItemCardProps) {
  const [qty, setQty] = useState(quantity);
  const [loading, setLoading] = useState(false);
  const [hasProtection, setHasProtection] = useState<boolean>(false);
  const updateQuantity = async (newQty: number) => {
    setQty(newQty);

    try {
      setLoading(true);

      const res = await fetch("/api/orderItem/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItemId,
          quantity: newQty,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }
      const data = await res.json();
      console.log("Updated:", data);
      refreshData();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update quantity");
      setQty(quantity);
    } finally {
      setLoading(false);
    }
  };

  const increment = () => {
    if (qty < product.stock) {
      updateQuantity(qty + 1);
      setRefreshFetch(!refreshFetch);
    }
  };

  const decrement = () => {
    if (qty > 1) {
      updateQuantity(qty - 1);
      setRefreshFetch(!refreshFetch);
    }
  };

  const toggleProtection = () => {
    if (hasProtection) {
      setProtection(protection - 1);
    } else {
      setProtection(protection + 1);
    }
    setHasProtection(!hasProtection);
  };

  return (
    <div className="bg-base mb-4 text-white rounded border border-gray-700 p-4 md:p-6 space-y-4 w-full md:w-[889px]">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">
        {product?.imageUrl && (
          <div className="p-[12px] border rounded">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={148}
              height={114}
            />
          </div>
        )}
        <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">{product?.name}</p>
            <button className="inline-block max-w-[100px] text-sm rounded text-white bg-orange-500 px-[6px] py-[10px]">
              {product.category.name}
            </button>
          </div>
          <div>
            <p className="text-white font-medium">$ {product?.price}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 w-full">
            <p className="text-primary-500 md:border-r border-gray-500 flex items-center md:pr-[24px]">
              Write Note
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 w-full md:w-auto">
              <div className="px-[14px] py-[10px] flex justify-between items-center gap-2 border rounded w-full max-w-[150px] h-[44px]">
                <button onClick={decrement} disabled={qty <= 1 || loading}>
                  -
                </button>
                <span className="w-8 text-center">{qty}</span>
                <button
                  onClick={increment}
                  disabled={qty >= product.stock || loading}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-center border-t border-gray-700 pt-4 gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-center md:text-left">
          <Checkbox
            checked={hasProtection}
            onChange={toggleProtection}
            label=""
          />
          <div>
            <p className="font-medium">Product Protection</p>
            <p className="text-sm text-gray-400">
              The claim process is easy and instant, valid for 6 months
            </p>
          </div>
        </div>
        <span className="text-white font-medium">$1</span>
      </div>
    </div>
  );
}
