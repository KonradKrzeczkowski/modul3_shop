import React from "react";
import Image from "next/image";

type ProductCardProps = {
  imageUrl: string;
  category: string;
  name: string;
  price: number;
  onAddToCart: () => void;
};

export default function ProductCard({
  imageUrl,
  category,
  name,
  price,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      className="
        w-[300px] h-[386px] rounded-[6px] border
        border-gray-200
        p-[16px_16px_20px_16px]
        flex flex-col gap-4
        relative
        font-inter
        bg-base
        category: { id: string; name: string; image: string }
        
      "
    >
      <div className="relative rounded-[6px] overflow-hidden">
        {imageUrl ? (
          <div className="h-[204px] w-268px bg-neutral-50">
            {" "}
            <Image
              src={imageUrl}
              alt={name}
              className="w-full h-[204px] object-cover rounded-[6px]"
              width={268}
              height={204}
              priority
            />
          </div>
        ) : null}

        <button
          onClick={onAddToCart}
          aria-label="Add to cart"
          className="
            absolute top-4 left-4
            w-8 h-8
            bg-[#262626]
            rounded
            flex items-center justify-center
            p-0
            cursor-pointer
            border-none
          "
        >
          <Image src="/Cart/Cart/cart.svg" alt="Cart" width={19} height={18} />
        </button>
      </div>
      <button
        disabled
        className="
          bg-blazeOrange-50
          text-red
          font-normal text-[14px]
          font-inter
          rounded
          px-2 py-1
          self-start
          cursor-default
          select-none
          border-none
      
          h-[36px]
        "
      >
        {category}
      </button>
      <div
        className="
          font-inter
          text-[18px]
          font-normal
          text-neutral-900
          mt-4
        "
      >
        {name}
      </div>
      <div
        className="
          font-inter
          font-semibold
          text-[28px]
          text-neutral-900
          mt-2
        "
      >
        ${price}
      </div>
    </div>
  );
}
