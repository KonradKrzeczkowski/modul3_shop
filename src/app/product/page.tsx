"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./cardProduct";
import ChevronDownIcon from "@/components/icons/chevronDownIcon";
import Plus from "@/components/icons/plus";
import { useSearchParams } from "next/navigation";
import Checkbox from "@/components/checkbox";
import PaginationProduct from "@/components/paginationProduct";
import { useMessage } from "@/components/hook/messageContext";
type Product = {
  id: number;
  name: string;
  price: number;
  category: { id: string; name: string; image: string };
  imageUrl: string;
};

type Pagination = {
  page: number;
  pages: number;
};

type Category = { id: string; name: string };

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState(false);
  const showOptions = [3, 6, 9, 12, 24];
  const [initialized, setInitialized] = useState(false);
  const [sort, setSort] = useState("latest");
  const [show, setShow] = useState(3);
  const [page, setPage] = useState(1);
  const { setMessage } = useMessage();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoriesFromUrl = searchParams.getAll("category");
    if (categoriesFromUrl.length > 0) {
      setSelectedCategoryIds(categoriesFromUrl);
      setInitialized(true);
    }
  }, [searchParams]);

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "priceAsc", label: "The cheapest" },
    { value: "priceDesc", label: "The most" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        const uniqueCategories = data.reduce(
          (acc: Category[], curr: Category) => {
            if (!acc.some((c) => c.name === curr.name)) {
              acc.push(curr);
            }
            return acc;
          },
          []
        );
        setCategories(uniqueCategories ?? []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        sort,
        limit: show.toString(),
        page: page.toString(),
      });
      selectedCategoryIds.forEach((id) =>
        params.append("categoryId", String(id))
      );
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products);
      setPagination(data.pagination ?? { page: 1, pages: 1 });
    } catch (error) {
      console.error(error);
      setProducts([]);
      setPagination({ page: 1, pages: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategoryIds, minPrice, maxPrice, sort, show, page]);

  const toggleCategory = (id: string) => {
    if (id === "all") {
      setSelectedCategoryIds([]);
      setPage(1);
      return;
    }
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((x) => x !== id));
      setPage(1);
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
      setPage(1);
    }
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
      setMessage("Product Successfully Added");
    } catch (err) {
      console.error(err);
      alert("Błąd przy dodawaniu do koszyka");
    }
  };

  if (loading) return <p>Ładowanie produktów...</p>;

  return (
    <div className="flex flex-col md:flex-row  md:p-6 gap-6 p-0.5">
      <div className="md:w-1/4 p-4 md:border-r  border-gray-400 space-y-4">
        <h2 className="text-lg font-semibold">Category</h2>
        {categories.length === 0 ? (
          <p>Not found</p>
        ) : (
          <div className="space-y-2">
            <Checkbox
              checked={selectedCategoryIds.length === 0}
              onChange={() => toggleCategory("all")}
              label="All products"
            />
            {(showAllCategories ? categories : categories.slice(0, 4)).map(
              (c) => (
                <div key={c.id}>
                  <Checkbox
                    checked={selectedCategoryIds.includes(c.id.toString())}
                    onChange={() => toggleCategory(c.id.toString())}
                    label={c.name}
                  />
                </div>
              )
            )}

            {categories.length > 4 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="flex items-center text-blue-500 mt-2 text-sm text-neutral-600 font-inter gap-[14px]"
              >
                {showAllCategories ? "Show less" : "Show more"}
                <Plus />
              </button>
            )}
          </div>
        )}
        <h2 className="text-lg font-semibold mt-6">price</h2>
        <div className="md:w-full max-w-[263px] h-[54px] flex border border-gray-400 bg-base rounded overflow-hidden">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="flex-1 p-2 outline-none border-none h-full w-[157px]"
          />
          <div className="flex items-center px-3 border-l border-gray-400 gap-1 h-full text-inter text-[16px] text-neutral-900 ">
            USD
            <ChevronDownIcon />
          </div>
        </div>
        <div className="md:w-full max-w-[263px] h-[54px] flex border border-gray-400 bg-base rounded overflow-hidden">
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="flex-1 p-2 outline-none border-none w-[157px]"
          />
          <div className="flex items-center px-3 border-l border-gray-400 gap-1 text-inter text-[16px] text-neutral-900 ">
            USD
            <ChevronDownIcon />
          </div>
        </div>
      </div>
      <div className="md:w-3/4 w-full">
        <div className="flex justify-between mb-4">
          <div className="relative inline-block">
            <label className="mr-2 font-inter text-xl text-neutral-900 font-semibold">
              Sort by
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-gray-400 font-inter appearance-none border text-neutral-900 bg-base rounded-[6px] p-2 pr-8 text-sm w-[126px] h-[44px]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon className="text-neutral-900" />
            </div>
          </div>
          <div className="relative inline-block">
            <label className="mr-2 font-inter text-xl text-neutral-900 font-semibold">
              Show
            </label>
            <select
              value={show}
              onChange={(e) => {
                setShow(Number(e.target.value));
                setPage(1);
              }}
              className="font-inter appearance-none border border-gray-400 rounded-[6px] bg-base p-2 pr-8 text-sm w-[102px] h-[44px] text-neutral-900 text-sm font-normal"
            >
              {showOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDownIcon className="text-neutral-900" />
            </div>
          </div>
        </div>
        {products.length === 0 ? (
          <p>Brak produktów</p>
        ) : (
          <div className=" flex flex-wrap justify-center w-full gap-4">
            {products.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <ProductCard
                  imageUrl={p.imageUrl || p.category.image}
                  category={p.category.name}
                  name={p.name}
                  price={p.price}
                  onAddToCart={() => handleAddToCart(p)}
                />
              </Link>
            ))}
          </div>
        )}
        <PaginationProduct pagination={pagination} setPage={setPage} />
      </div>
    </div>
  );
}
