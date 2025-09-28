export async function addToCart(productId: number, quantity: number) {
  const response = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Coś poszło nie tak");
  }

  return response.json();
}