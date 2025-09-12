"use client";

import Image from "next/image";

export default function SuccessfullyRegister() {
  return (
    <div className="flex flex-col items-center justify-start mt-20 text-center px-4 pb-20">
    <div className="w-[100px] h-[100px] p-[12,5px] mb-10">
        <Image
          src="/alert/shape-3.svg"
          alt="Alert Icon"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
      <div className="h-[323px] flex flex-col justify-start">
<h1 className="text-[44px] font-bold mb-4">Thank you!</h1>
        <h2 className="text-[24px] font-medium mb-4">
          You have successfully registered
        </h2>
         <p className="text-[18px] font-normal mb-4 max-w-md mx-auto">
          Please check your e-mail for further information. Let’s explore our
          products and enjoy many gifts.
        </p>
        <p className="text-[18px] font-normal">
          Having problem?{" "}
          <span className="text-orange-500 font-medium cursor-pointer">
            Contact us
          </span>
        </p>
      </div>
    </div>
  );
}