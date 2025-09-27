"use client";
import { useEffect, useState, use } from "react";
import ProductImageGallery from "@/components/productGallery";
import ProductDetails from "@/components/productDetails";
import ProductPurchase from "@/components/productCart";
import BreadcrumbProduct from "@/components/breadCrumbProduct";
import { useMessage } from "@/components/hook/messageContext";

enum ProductType {
 
  Monitor=2,
  Headphone = 3,
  Keyboard = 4,
  Webcam=5,
 Mouse = 1,
}

type Product = {
  id: string;
  name: string;
  price: number;
  category: { name: string; image: string };
  imageUrl: string;
  description: string;
  stock: number;
  categoryId:number;
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setMessage } = useMessage();
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Produkt nie znaleziony");
        return res.json();
      })
      .then((data: Product) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;
  if (!product) return <div>Produkt nie istnieje</div>;
  const giveMessage = () => {
    setMessage("Product Successfully Added ");
  };

  function getEstimatedArrival(): string {
    const today = new Date();
    const randomStartOffset = Math.floor(Math.random() * 5);
    const startDate = new Date();
    startDate.setDate(today.getDate() + randomStartOffset);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 3);

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    const startFormatted = startDate.toLocaleDateString("en-GB", options);
    const endFormatted = endDate.toLocaleDateString("en-GB", options);
    return `Estimated arrival ${startFormatted} - ${endFormatted}`;
  }
  console.log();
  const images = product.imageUrl ? product.imageUrl : product.category?.image;
  console.log(product.category);
  return (
    <div>
      <div>
        <BreadcrumbProduct lastLabel={product.name} />
      </div>
      <div>
        <div className="w-full max-w-[1440px] mx-auto p-6 pb-[48px] flex flex-col md:flex-row gap-6 text-white justify-center">
          <div className="border-b  flex flex-wrap gap-6 pb-[48px] ">
            <ProductImageGallery images={images} />
            <ProductDetails
              name={product.name}
              category={ProductType[product.categoryId] ?? "Brak kategorii"}
              price={product.price}
              description={product.description ?? "Brak opisu produktu"}
              shipping={getEstimatedArrival()}
            />
          </div>
          <ProductPurchase
            onSendData={giveMessage}
            stock={product.stock}
            productId={product.id}
            price={product.price}
          />
        </div>
      </div>
    </div>
  );
}
