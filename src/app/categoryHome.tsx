import React from "react";
import CategoryCard from "@/components/CategoryCard";
import Link from "next/link";
const cards = [
  {
    image: "/category/Frame6467.svg",
    name: "Mouse",
    id: 1,
    url: "/product?category=1",
  },
  {
    image: "/category/Frame6468.svg",
    name: "Monitor",
    id: 2,
    url: "/product?category=2",
  },
  {
    image: "/category/Frame6470.svg",
    name: "Headphone",
    id: 3,
    url: "/product?category=3",
  },
  {
    image: "/category/Frame6472.svg",
    name: "Keyboard",
    id: 4,
    url: "/product?category=4",
  },
  {
    image: "/category/Frame6475.svg",
    name: "Webcam",
    id: 5,
    url: "/product?category=5",
  },
];
const CategoryHome = () => {
  return (
    <div className="mb-25">
      <h1 className="text-[28px]  text-[var(--color-neutral-900)] mb-8">
        Category
      </h1>
     <div
  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar w-full px-4 justify-between"
>
  {cards.map((card) => (
    <div key={card.id} className="flex-shrink-0 justify-content">
      <Link href={card.url}>
        <CategoryCard imageSrc={card.image} name={card.name} />
      </Link>
    </div>
  ))}
</div>
    </div>
  );
};

export default CategoryHome;
