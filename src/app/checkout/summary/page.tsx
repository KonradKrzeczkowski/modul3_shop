"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import SpanSummary from "@/components/spanSummary";
import GreatOrder from "@/components/icons/greatOrder";
type Item = {
  product: {
    name: string;
    imageUrl: string;
    category: { name: string };
    price: number;
  };
  quantity: number;
  protection?: boolean;
};

export default function Page() {
  const searchParams = useSearchParams();
  const itemsParam = searchParams.get("items");
  const items: Item[] = useMemo(() => {
    if (!itemsParam) return [];
    try {
      return JSON.parse(decodeURIComponent(itemsParam));
    } catch {
      return [];
    }
  }, [itemsParam]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalProductPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const totalProtection = items.reduce(
    (sum, i) => sum + (i.protection ? 1 : 0),
    0
  );
  const totalShipping = 6;
  const shippingInsurance = 5;
  const transactionFees = 0.5;
  const serviceFees = 0;

  const grandTotal =
    totalProductPrice +
    totalProtection +
    totalShipping +
    shippingInsurance +
    transactionFees +
    serviceFees;

  return (
    <div className="max-w-[640px] mx-auto bg-base text-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex flex-col items-center w-full justify-content">
        <GreatOrder />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl  mt-2">Thanks for Your Order!</h2>
        <p className="text-sm text-gray-400">
          INV/{Math.floor(Math.random() * 1000000)}
        </p>
      </div>
      <div className="text-sm  flex flex-col gap-6  ">
        <div className="flex flex-col justify-between text-[18px] text-neutral-900 gap-4 pb-6 border-b border-gray-200">
          <span className="text-neutral-600 text-[18px]">Transaction Date</span>
          <span className="text-neutral-600 ">{formattedDate}</span>
        </div>

        <div className="flex flex-col justify-between text-neutral-900 gap-4 pb-6 border-b border-gray-200 ">
          <span className="text-neutral-600">Payment Method</span>
          <span>Apple Pay</span>
        </div>
        <div className="flex flex-col justify-between text-neutral-900 gap-4 pb-6 border-b border-gray-200 ">
          <span className="text-neutral-600">Shipping Method</span>
          <span>Nexushub Courier</span>
        </div>
      </div>
      <span className="mb-4">Your Order</span>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-lg p-4 flex gap-4 mt-4"
        >
          <div className="p-3 border rounded-[6px] border-gray-200">
            <Image
              src={item.product.imageUrl}
              alt={item.product.name}
              width={80}
              height={80}
              className="rounded"
            />
          </div>
          <div className="flex-1 text-neutral-900">
            <h3 className=" text-[20px] mb-3">{item.product.name}</h3>
            <span className="text-xs bg-orange-500 text-white  px-2.5 py-1.5 mb-4 rounded">
              {item.product.category.name}
            </span>
            <div className="flex justify-between items-center ">
              {" "}
              <p className="mt-2 text-[24px]">
                ${item.product.price.toFixed(2)}
              </p>
              <p className="text-[18px] text-gray-400 ">x{item.quantity}</p>
            </div>
            {item.protection && (
              <p className="text-sm text-green-400">Protection</p>
            )}
          </div>
        </div>
      ))}
      <div className="space-y-1 text-sm flex flex-col gap-4">
        <SpanSummary
          label={`Total Product Price (${items.length} items)`}
          value={`$${totalProductPrice.toFixed(2)}`}
        />
        <SpanSummary
          label="Total Product Protection"
          value={`${totalProtection.toFixed(2)}`}
        />
        <SpanSummary
          label="Total Shipping Price"
          value={`${totalShipping.toFixed(2)}`}
        />{" "}
        <SpanSummary
          label="Shipping Insurance"
          value={`${shippingInsurance.toFixed(2)}`}
        />
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Transaction Fees</span>
        </div>
        <div className="flex justify-between">
          <span>Service Fees</span>
          <span>${transactionFees.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between   border-t border-gray-700 pt-4">
        <span className="text-neutral-900 text-[18px]">Grand Total</span>
        <span className="text-neutral-900 text-[28px]">
          ${grandTotal.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-neutral-900 text-[18px]">Status</span>
        <span className="bg-success-800 px-3 py-1 rounded text-sm">
          Success
        </span>
      </div>
      <div className="w-full">
        <Link
          href="/product"
          className=" block w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-lg text-base font-medium flex itrms-center justify-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
