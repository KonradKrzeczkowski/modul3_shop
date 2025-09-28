"use client";

import { useRef, useState, useEffect } from "react";
import CategoryCard from "@/components/CategoryCard";
import { Brand } from "@/lib/types";

export default function BrandListClient() {
  const listRef = useRef<HTMLDivElement>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showSeeMore, setShowSeeMore] = useState(true);

 
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/brand");
        if (!res.ok) throw new Error("Failed to fetch brands");
        const data: Brand[] = await res.json();
        setBrands(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrands();
  }, []);

  const handleSeeMore = () => {
    if (listRef.current) {
      const gap = 24;
      const scrollAmount = 220 + gap;
      listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScroll = () => {
    if (!listRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    setShowSeeMore(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [brands]);

  return (
    <div className="pt-[80px] pb-[100px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[28px] font-semibold">Brands</h2>
        {showSeeMore && (
          <button
            onClick={handleSeeMore}
            className="text-blue-500 hover:underline"
          >
            See more
          </button>
        )}
      </div>

      <div
        ref={listRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar justify-between"
        onScroll={checkScroll}
      >
        {brands
          .filter(
            (brand, index, self) =>
              index === self.findIndex((b) => b.name === brand.name)
          )
          .map((brand) => (
            <div key={brand.id} className="flex-shrink-0">
              <CategoryCard
                imageSrc={brand.logo ?? "/placeholder.png"}
                name={brand.name}
              />
            </div>
          ))}
      </div>
    </div>
  );
}