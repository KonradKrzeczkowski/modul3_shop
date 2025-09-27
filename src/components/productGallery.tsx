import Image from "next/image";
import { useState } from "react";

type ProductImageGalleryProps = {
  images: string;
};

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(images);
  console.log(images);

  return (
    <div className="flex flex-col gap-8 w-full max-w-[422px]">
      <div className="md:w-[422px] w-full h-[341px]   overflow-hidden p-3">
        <Image
          src={selected}
          alt="Product"
          width={600}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex gap-[16px]">
        <div
          onClick={() => setSelected(images)}
          className={`w-[130px] h-[99px] cursor-pointer overflow-hidden "}`}
        >
          <Image
            src={images}
            alt="Thumbnail 0"
            width={130}
            height={99}
            className="object-cover w-full h-full"
          />
        </div>

        <div
          onClick={() => setSelected(images)}
          className={`w-[130px] h-[99px] cursor-pointer overflow-hidden"}`}
        >
          <Image
            src={images}
            alt="Thumbnail 1"
            width={130}
            height={99}
            className="object-cover w-full h-full"
          />
        </div>

        <div
          onClick={() => setSelected(images)}
          className={`w-[130px] h-[99px]  cursor-pointer overflow-hidden "}`}
        >
          <Image
            src={images}
            alt="Thumbnail 2"
            width={130}
            height={99}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
