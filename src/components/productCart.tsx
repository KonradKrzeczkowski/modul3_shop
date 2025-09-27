"use client";
import { useState } from "react";
import InputIcon from "./icons/inputIcon";
import CartIcon from "./icons/cartIcon";
import { useMessage } from "./hook/messageContext";
type ProductPurchaseProps = {
  stock: number;
  productId: string;
  price: number;
  onSendData?: (msg: string) => void;
};

export default function ProductPurchase({
  stock,
  productId,
  price,
}: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setMessage } = useMessage();

  const addToCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Błąd dodawania do koszyka");
      setMessage("Product Successfully Added ");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else if (typeof error === "string") {
        console.log(error);
      } else {
        setMessage("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[300px] self-start p-4 border border-gray-200 bg-base rounded flex flex-col gap-4">
      <div>
        <h3 className="font-inter text-[18px] text-neutral-500 mb-1">Colors</h3>
        <div className="flex gap-4">
          <div className="w-[54px] h-[54px] border rounded cursor-pointer bg-white flex justify-center items-center ">
            <InputIcon />
          </div>
          <div className="w-[54px] h-[54px] border rounded cursor-pointer bg-black" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Quantity</h3>
        <div className="flex items-center gap-4">
          <div className=" px-[14px] py-[20px] flex justify-between items-center gap-2 border rounded w-[142px] h-[54px]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2 py-1 "
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
              className="px-2 py-1 "
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-1 text-center">
            Stock: {stock}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <h3 className="font-semibold mb-1">Subtotal</h3>
        <p className="text-lg font-bold">${(quantity * price).toFixed(2)}</p>
      </div>
 <button
        onClick={addToCart}
        disabled={loading}
        className="w-full border-primary-500 border text-primary-500 py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <span>{loading ? "Add..." : "Add to Cart"}</span>
        <CartIcon color=" #ee701d" />
      </button>
    </div>
  );
}
