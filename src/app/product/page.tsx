"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

type Pagination = {
  page: number;
  pages: number;
};

export default function ProductPage() {
  


  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState(false);


  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const sortOptions = [
    { value: "latest", label: "Najnowsze" },
    { value: "oldest", label: "Najstarsze" },
    { value: "priceAsc", label: "Od najtańszych" },
    { value: "priceDesc", label: "Od najdroższych" },
  ];
  const showOptions = [3, 6, 9, 12, 24];

  const [sort, setSort] = useState("latest");
  const [show, setShow] = useState(3);
  const [page, setPage] = useState(1);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setCategories(data ?? []);
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
        ...(categoryId && { categoryId }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        sort,
        limit: show.toString(),
        page: page.toString(),
      });

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
  }, [categoryId, minPrice, maxPrice, sort, show, page]);

  const handlePageChange = (p: number) => setPage(p);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setPage((prev) => Math.min(prev + 1, pagination.pages));

  if (loading) return <p>Ładowanie produktów...</p>;

  return (
    <div className="flex p-6 gap-6">
     <div className="w-1/4 p-4 border rounded space-y-4">
        <h2 className="text-lg font-semibold">Kategorie</h2>
        {categories?.length === 0 ? (
          <p>Brak kategorii</p>
        ) : (
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)} 
            className="border rounded p-1 w-full"
          >
            <option value="">Wszystkie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        )}

        <h2 className="text-lg font-semibold mt-6">Cena</h2>
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded p-1 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded p-1 w-full"
        />
        <button
          onClick={() => {
            setMinPrice("");
            setMaxPrice("");
          }}
          className="text-sm text-blue-600 mt-1"
        >
          Wyczyść
        </button>
      </div>


      <div className="w-3/4">
      
        <div className="flex justify-between mb-4">
          <div>
            <label className="mr-2 font-semibold">Sortuj: </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded p-1"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mr-2 font-semibold">Pokaż: </label>
            <select
              value={show}
              onChange={(e) => {
                setShow(Number(e.target.value));
                setPage(1);
              }}
              className="border rounded p-1"
            >
              {showOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

       
        {products?.length === 0 ? (
          <p>Brak produktów</p>
        ) : (
  <div className="grid grid-cols-3 gap-4">
  {products?.map((p) => (
    <Link
      key={p.id}
      href={`/product/${p.id}`}
      className="p-4 border rounded shadow-sm hover:shadow-lg block"
    >
      <h3 className="text-lg font-semibold">{p.name}</h3>
      <p className="text-gray-600">{p.price} zł</p>
    </Link>
  ))}
</div>
        )}

       
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  pagination.page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={pagination.page === 1}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
