import Protect from "./icons/protect";
import { useState } from "react";

type ProductDetailsProps = {
  name: string;
  category: string;
  price: number;
  description: string;
  shipping: string;
};

export default function ProductDetails({
  name,
  category,
  price,
  description,
  shipping,
}: ProductDetailsProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 150;
  const toggleExpanded = () => setExpanded(!expanded);
console.log(category)
  return (
    <div className="flex flex-col gap-8 w-full max-w-[427px] h-[500px]">
      <div className="flex flex-col gap-[20px]">
        <h1 className="text-[28px] text-neutral-900 font-semibold">{name}</h1>
        <button className="flex-none inline-block w-[100px] text-sm rounded text-primary-800 font-inter font-medium text-white bg-orange-500 px-[6px] py-[10px]">
          {category}
        </button>
      </div>
      <p className="text-3xl font-inter text-neutral-900">
        ${price.toFixed(2)}
      </p>
      <div>
        <p
          className={`text-gray-300 text-sm ${
            !expanded && isLong ? "line-clamp-2" : ""
          }`}
        >
          {description}
        </p>
        {isLong && (
          <p
            className="font-medium font inter cursor-pointer mt-1 text-primary-500"
            onClick={toggleExpanded}
          >
            {!expanded ? "View More" : "View Less"}
          </p>
        )}
      </div>
      <div>
        <h3 className="font-medium text-neutral-500 mb-1 text-[18px]">
          Shipping Available
        </h3>
        <div className="mt-4 p-4 border rounded-[6px] border-neutral-900">
          <div className="flex gap-[8px]">
            <Protect />
            <div className="flex flex-col">
              <p className="font-inter font-medium">NexusHub Courier</p>
              <p className="text-neutral-600 font-normal font-inter">
                {shipping}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
