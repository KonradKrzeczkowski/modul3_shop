"use client";
import ProductCard from "../product/cardProduct";
import { useRef, useState, useEffect } from "react";
import { useMessage } from "@/components/hook/messageContext";
import Link from "next/link";
type Product = {
  id: number;
  name: string;
  price: number;
  category: { id: number; name: string; image: string };
  imageUrl: string;
};

type Props = {
  recommendedProducts: Product[];
};

export default function RecommendationListClient({
  recommendedProducts,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [showSeeMore, setShowSeeMore] = useState(true);
  const { message, setMessage } = useMessage();
  const [add, setAdd] = useState("");
  const handleSeeMore = () => {
    if (listRef.current) {
      const scrollAmount = listRef.current.offsetWidth;
      listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScroll = () => {
    if (!listRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    setShowSeeMore(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const res = await fetch("/api/cart/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      const data = await res.json();
      if (data.success) console.log("Wywołałem setMessage");
      setMessage("Dodano do koszyk");
      setAdd("dup");
    } catch (err) {
      console.error(err);
      alert("Błąd przy dodawaniu do koszyka");
    }
  };

  useEffect(() => {
    console.log("Nowy message:", message);
  }, [message]);

  useEffect(() => {
    console.log("Nowe add:", add);
  }, [add]);
  useEffect(() => {
    checkScroll();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[28px] font-semibold">Recommendation</h2>
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
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
        onScroll={checkScroll}
      >
        {recommendedProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0">
            <Link href={`/product/${product.id}`}>
              <ProductCard
                imageUrl={product.imageUrl || product.category.image}
                category={product.category.name}
                name={product.name}
                price={product.price}
                onAddToCart={() => {
                  handleAddToCart(product);
                }}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
