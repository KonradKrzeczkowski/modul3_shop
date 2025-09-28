"use client";

import { useState } from "react";

const data = {
  Polska: {
    Mazowieckie: ["Warszawa", "Radom", "Płock", "Siedlce"],
    Małopolskie: ["Kraków", "Tarnów", "Nowy Sącz", "Oświęcim"],
    Śląskie: ["Katowice", "Częstochowa", "Gliwice", "Bytom"],
    Pomorskie: ["Gdańsk", "Gdynia", "Sopot", "Tczew"],
  },
  Niemcy: {
    Bayern: ["Monachium", "Norymberga", "Augsburg", "Würzburg"],
    Nordrhein: ["Kolonia", "Düsseldorf", "Dortmund", "Essen"],
    Hessen: ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt"],
    Sachsen: ["Drezno", "Leipzig", "Chemnitz", "Zwickau"],
  },
  Słowacja: {
    Bratislava: [
      "Bratislava I",
      "Bratislava II",
      "Bratislava III",
      "Bratislava IV",
    ],
    Kosice: ["Kosice I", "Kosice II", "Kosice III", "Kosice IV"],
    Presov: ["Presov I", "Presov II", "Presov III", "Presov IV"],
    Nitra: ["Nitra I", "Nitra II", "Nitra III", "Nitra IV"],
  },
  Czechy: {
    Praha: ["Praha 1", "Praha 2", "Praha 3", "Praha 4"],
    Brno: ["Brno-střed", "Brno-sever", "Brno-jih", "Brno-venkov"],
    Ostrava: [
      "Ostrava-město",
      "Ostrava-jih",
      "Ostrava-sever",
      "Ostrava-východ",
    ],
    Plzen: ["Plzen-město", "Plzen-jih", "Plzen-sever", "Plzen-západ"],
  },
};

type Country = keyof typeof data;

export default function AddressForm({ userId }: { userId: number }) {
  const [formData, setFormData] = useState({
    address: "",
    country: "" as Country | "",
    province: "" as string,
    city: "" as string,
    postalCode: "" as string,
    isMain: false,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
      ...(name === "country" && { province: "", city: "", postalCode: "" }),
      ...(name === "province" && { city: "", postalCode: "" }),
      ...(name === "city" && { postalCode: "" }),
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/adress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error saving address:", data);
        throw new Error(data?.error || "Failed to save address");
      }

      alert("Address saved successfully!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert(
        "Error saving address: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };
  const countries = Object.keys(data) as Country[];
  const provinces =
    formData.country !== ""
      ? (Object.keys(data[formData.country as Country]) as string[])
      : [];
  const cities =
    formData.country !== "" && formData.province !== ""
      ? data[formData.country as Country][
          formData.province as keyof (typeof data)[Country]
        ]
      : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  p-6 bg-base border border-gray-200 rounded-md text-white space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="bg-base text-neutral-500 w-full px-3 py-2 rounded  border border-gray-700 focus:outline-none focus:border-orange-500"
            required
          >
            <option className="text-neutral-500 " value="">
              Country
            </option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="bg-base text-neutral-500 w-full px-3 py-2 rounded  border border-gray-700 focus:outline-none focus:border-orange-500"
            disabled={!formData.country}
            required
          >
            <option value="">Province</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className=" bg-base text-neutral-500 w-full px-3 py-2 rounded  border border-gray-700 focus:outline-none focus:border-orange-500"
            disabled={!formData.province}
            required
          >
            <option value="">City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className=" bg-base text-neutral-500 w-full px-3 py-2 rounded  border border-gray-700 focus:outline-none focus:border-orange-500"
            disabled={!formData.city}
            required
          >
            <option value="">Postal Code</option>
            {formData.city &&
              Array.from({ length: 4 }, (_, i) => (
                <option key={i} value={`${i + 10000}`}>
                  {i + 10000}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div>
        <input
          placeholder="Input Complete Address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className=" text-neutrau-500 w-full min-h-[130px] px-3 py-2 rounded  border border-gray-700  focus:border-orange-500"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isMain"
          checked={formData.isMain}
          onChange={handleChange}
        />
        <span>Set as main address</span>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Save Address
      </button>
    </form>
  );
}
