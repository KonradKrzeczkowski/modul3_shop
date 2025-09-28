"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ExistingAddress from "@/components/checkout/existingAddress";
import AddressForm from "@/components/checkout/newAddressForm";

type Address = {
  id: number;
  userId: number;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  isMain: boolean;
};

export default function AddressTabs() {
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing");
  const [mainAddress, setMainAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    async function fetchAddresses() {
      try {
        const res = await fetch("/api/adress");
        const data: Address[] = await res.json();
        const main = data.find((addr) => addr.isMain) || null;
        setMainAddress(main);
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAddresses();
  }, [userId]);

  if (status === "loading") return <p>Loading user...</p>;
  if (!userId) return <p>User not logged in</p>;

  return (
    <div className="w-full border border-gray-200 rounded-md text-white bg-base">
      <div className="flex border-b border-gray-700 w-full">
        <button
          onClick={() => setActiveTab("existing")}
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "existing"
              ? "border-b-2 border-primary-500 text-primary-500"
              : "text-gray-400"
          }`}
        >
          Existing Address
        </button>
        <button
          onClick={() => setActiveTab("new")}
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "new"
              ? "border-b-2 border-orange-500 text-orange-400"
              : "text-gray-400"
          }`}
        >
          New Address
        </button>
      </div>
      <div className="p-4 md:p-6 w-full">
        {activeTab === "existing" ? (
          <ExistingAddress address={mainAddress} loading={loading} />
        ) : (
          <AddressForm userId={Number(session?.user?.id)} />
        )}
      </div>
    </div>
  );
}
