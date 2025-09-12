import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  categoryImage?: string | null;
};
type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export default function RecommendationCard({ product, onAddToCart }: Props) {
  return (
    <div className="relative   rounded-lg shadow-md overflow-hidden bg-[var(--color-base)] w-[300px] h-[386px] border p-4 rounded">

      <div className="w-full h-[204px] relative">
        <Image
          src={product.categoryImage ?? "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover"
        />

    
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
            className="absolute top-4 left-4 bg-[var(--color-base)] text-white w-8 h-8 rounded-[6px] flex items-center justify-center "
          >
            🛒
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-md font-bold">${product.price}</p>
      </div>
    </div>
  );
}