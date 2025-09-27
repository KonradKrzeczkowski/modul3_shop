"use client";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import Delete from "@/icons/delete";
import { useRouter } from "next/navigation";
import { useMessage } from "./hook/messageContext";
import Checkbox from "./checkbox";
type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedPrice: number;
  product?: {
    name: string;
    price: number;
    imageUrl?: string;
    category?: {
      name: string;
    };
  };
};

type Cart = {
  id: number;
  items: CartItem[];
};

export default function Cart({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { setMessage } = useMessage();

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/cart/me`);
      if (!res.ok) throw new Error("Cart not found");
      const data: Cart = await res.json();
      setCart(data);
      setSelectedItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [id]);

  const updateQuantity = async (itemId: number, newQty: number) => {
    if (newQty < 1) return;
    await fetch(`/api/cart/cart/item/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQty }),
    });
    fetchCart();
  };

  const removeItem = async (itemId: number) => {
    await fetch(`/api/cart/cart/item/${itemId}`, { method: "DELETE" });
    fetchCart();
    console.log(itemId);
  };

  const toggleSelectItem = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleSelectAll = () => {
    if (!cart) return;
    if (selectedItems.length === cart.items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.items.map((i) => i.id));
    }
  };

  const selectedProducts =
    cart?.items.filter((item) => selectedItems.includes(item.id)) || [];

  const subtotal = selectedProducts.reduce(
    (sum, item) =>
      sum + item.quantity * (item.product?.price ?? item.addedPrice),
    0
  );

  const handleCheckout = async () => {
    if (selectedProducts.length === 0) return alert("No products selected!");

    const orderItems = selectedProducts.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      addedPrice: item.product?.price ?? item.addedPrice,
    }));

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: orderItems }),
      });

      if (!res.ok) throw new Error("Error while creating the order");

      const data = await res.json();
      setMessage("Order created! ID: " + data.order.id);
      router.push("/checkout");

      fetchCart();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;
  if (!cart || cart.items.length === 0) return <div>Koszyk pusty</div>;
  console.log(cart);
  return (
    <div className="flex flex-wrap md:gap-[48px] md:p-[40px] p-2 mx-auto">
      <div className="w-full md:w-[839px]">
        <div className="flex items-center mb-4">
          <Checkbox
            label="Select All"
            onChange={toggleSelectAll}
            checked={selectedItems.length === cart.items.length}
          />
        </div>

        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row w-full md:w-[839px] mx-auto gap-2"
          >
            <div className="flex items-center justify-center md:justify-start mb-2 md:mb-0">
              <Checkbox
                label=""
                onChange={() => toggleSelectItem(item.id)}
                checked={selectedItems.includes(item.id)}
              />
            </div>
            <div className="w-full md:h-[186px] border rounded-[6px] border-gray-200 bg-base p-[16px] md:p-[24px] my-2 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 w-full h-full flex-col md:flex-row">
                {item.product?.imageUrl && (
                  <div className="p-[12px] border rounded">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      width={148}
                      height={114}
                    />
                  </div>
                )}

                <div className="flex-1 w-full text-center md:text-left">
                  <div>
                    <div className="flex justify-between items-center w-full">
                      <p className="font-semibold">
                        {item.product?.name ?? `${item.productId}`}
                      </p>
                      <div
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-1 text-white rounded cursor-pointer"
                      >
                        <Delete />
                      </div>
                    </div>
                    <button className="flex-none inline-block max-w-[100px] text-sm rounded text-white bg-orange-500 px-[6px] py-[6px] mt-2">
                      {item?.product?.category?.name}
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center w-full mt-3 gap-3">
                    <p>$ {item.product?.price ?? item.addedPrice} </p>

                    <div className="flex flex-col md:flex-row gap-3 font-inter">
                      <p className="text-primary-500 md:border-r border-gray-500 pr-0 md:pr-[24px]">
                        Write Note
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="px-[14px] py-[10px] flex justify-between items-center gap-2 border rounded w-[125px] h-[44px]">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-[320px] mt-6 border rounded-[6px] border-gray-200 bg-base p-[16px] md:p-[24px] flex flex-col max-h-[274px]">
        <div className="pb-[16px] md:pb-[24px] border-b border-gray-200 gap-[16px]">
          <p className="text-[18px] font-medium">Total Product</p>
          <p className="text-[16px]">
            Total Product Price (
            <strong>{selectedProducts.length} item)</strong>)
          </p>
        </div>
        <div className="mt-[16px] md:mt-[24px] flex flex-col gap-[24px] md:gap-[38px]">
          <p className="text-xl font-bold">Subtotal: {subtotal} $</p>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-primary-500 text-white rounded"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
