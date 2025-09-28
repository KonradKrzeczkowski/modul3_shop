"use client";
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

export default function ExistingAddress({ address, loading }: { address: Address | null; loading: boolean }) {
  if (loading) return <p className="text-gray-400 text-center">Loading address...</p>;
  if (!address) return <p className="text-gray-400 text-center">No main address found.</p>;

  return (
    <div className="mb-6  pb-4">
      <div className="flex items-center gap-2 mb-2 ">
        
        {address.isMain && ( 
          <div className="pb-[]12px"><span>Address</span><span className="bg-orange-500 text-white text-xs px-[6px] py-[10px] rounded">Main Address</span></div>
        )}
      </div>
      <span className="font-medium">{address.addressLine}</span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-1 pt-[40px]">
        <div className="flex flex-col gap-[8px]">
          <p className="text-sm text-neutral-600">Country</p>
          <p className="font-medium text-neutral-900 text-[18px]">{address.country}</p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-sm text-neutral-600">Province</p>
          <p className="font-medium text-neutral-900 text-[18px]">{address.province}</p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-sm text-neutral-600">City</p>
          <p className="font-medium text-neutral-900 text-[18px]">{address.city}</p>
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="text-sm text-neutral-600">Postal Code</p>
          <p className="font-medium text-neutral-900 text-[18px]">{address.postalCode}</p>
        </div>
      </div>
    </div>
  );
}



