"use client";

import { ChangeEvent } from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="flex items-center cursor-pointer font-inter text-neutral-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-[26px] h-[26px] border bg-gray-50 border-gray-400 rounded 
          appearance-none checked:bg-primary-500 checked:border-primary-500 
          transition-colors mr-2 font-inter text-neutral-900
          checked:after:content-['✓'] checked:after:text-base
          checked:after:flex checked:after:items-center checked:after:justify-center"
      />
      {label}
    </label>
  );
}