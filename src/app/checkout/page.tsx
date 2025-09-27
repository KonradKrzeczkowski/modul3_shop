"use client";
import React from "react";
import CartPage from "./CartPage";
import OrderSummary from "./orderSummary";
import AddressTabs from "./addressCard";
import Protection from "@/components/icons/protection";
import Image from "next/image";
import { useState } from "react";
const Page = () => {
  const [protection, setProtection] = useState<number>(0);
  const [refreshFetch, setRefreshFetch] = useState<boolean>(true);
  const handleProtection = (delta: number) => {
    setProtection((prev) => prev + delta);
  };
  const handleRefresh = () => setRefreshFetch((prev) => !prev);
  return (
    <div className="flex flex-col md:flex-row md:p-[40px] p-2 md:gap-[48px] gap-6">
      <div className="w-full flex flex-col gap-[24px] md:gap-[40px]">
        <CartPage
          protection={protection}
          setProtection={setProtection}
          setRefreshFetch={handleRefresh}
          refreshFetch={refreshFetch}
        />

        <AddressTabs />
        <div className="w-full flex flex-col gap-[12px] md:gap-[16px]">
          <p className="text-neutral-900 text-[20px] md:text-[24px]">
            Shipping
          </p>
          <div className="w-full border border-gray-200 rounded-[6px] p-[16px] md:p-[24px] flex gap-2 bg-base">
            <Protection />
            <p className="text-neutral-900 text-[16px] md:text-[18px]">
              NexusHub Courier
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[12px] md:gap-[16px]">
          <p className="text-neutral-900 text-[20px] md:text-[24px]">
            Payment Method
          </p>
          <div className="w-full border border-gray-200 rounded-[6px] p-[16px] md:p-[24px] flex gap-2 bg-base">
            <Image
              src="/home/Badge4.svg"
              alt="GooglePay"
              width={46.61}
              height={30.03}
              className="object-contain"
            />
            <p className="text-neutral-900 text-[16px] md:text-[18px]">
              Apple Pay
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto md:max-w-sm mt-6 md:mt-0">
        <OrderSummary
          protection={protection}
          setProtection={handleProtection}
          refreshFetch={refreshFetch}
        />
      </div>
    </div>
  );
};

export default Page;
