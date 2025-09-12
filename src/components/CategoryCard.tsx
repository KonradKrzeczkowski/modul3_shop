import React from "react";
import Image from "next/image";

type CategoryCardProps = {
  imageSrc: string; 
  name: string;    
};

export default function CategoryCard({ imageSrc, name }: CategoryCardProps) {
  return (
    <div
      className={`
        w-[220px] h-[190px] flex flex-col items-center justify-between
        border border-[var(--color-gray-400)] rounded-lg
        pt-[28px] px-[70px] pb-[24px]
        bg-[var(--color-base)]
      `}
    >
 <div className="w-[80px] h-[80px] flex items-center justify-center">
  <Image
    src={imageSrc}
    alt={name}
    width={80}
    height={80}
    className="object-contain"
  />
</div>
<p className="text-[20px] text-center text-[var(--color-neutral-900)]">
        {name}
      </p>
    </div>
  );
}