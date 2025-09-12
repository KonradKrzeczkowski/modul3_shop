import { useState } from "react";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  image: string;
};

type Props = {
  products: Product[];
};

const ProductGallery = ({ products }: Props) => {
   const [mainImage, setMainImage] = useState(products[0].image);

  return (
    <div className="p-4">
<div className="p-3 mb-8">
        <Image
          src={mainImage}
          alt="Duże zdjęcie produktu"
          width={600}
          height={400}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>
<div className="flex gap-4 justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer border rounded-md overflow-hidden hover:opacity-80 transition-opacity"
            onClick={() => setMainImage(product.image)}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={150}
              height={100}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;