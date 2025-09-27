import Breadcrumb from "@/components/Breadcrumb";
import Cart from "@/components/Cart";

export default function CartPage({ params }: { params: { id: string } }) {
  return (
    <div className="md:p-4">
      <Breadcrumb />
      <Cart params={Promise.resolve(params)} />
    </div>
  );
}