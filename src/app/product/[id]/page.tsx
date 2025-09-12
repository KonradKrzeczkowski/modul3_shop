"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: { id: string; name: string };
  brand?: { id: string; name: string; logo?: string };
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Ładowanie...</p>;
  if (!product) return <p>Nie znaleziono produktu</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-2">Cena: {product.price} zł</p>
      <p className="mb-2">Stan: {product.stock} szt.</p>
      <p className="mb-4">Opis: {product.description}</p>
      <p className="text-sm text-gray-500">
        Kategoria: {product.category?.name || "Brak"}
      </p>
      <p className="text-sm text-gray-500">
        Marka: {product.brand?.name || "Brak"}
      </p>
    </div>
  );
}