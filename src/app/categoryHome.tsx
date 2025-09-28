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
      <div className="flex  flex-col md:flex-row md:gap-0 gap-4 md:justify-between items-center">
        {cards.map((card) => (
          <Link href={card.url} key={card.id}>
            <CategoryCard imageSrc={card.image} name={card.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
