import React from "react";

type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export function CustomCheckbox({ label, checked, onChange }: CustomCheckboxProps) {
  return (
   <label className="flex items-center cursor-pointer font-inter text-neutral-900">
      <div className="custom-checkbox-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden"
        />
        <span className="custom-checkbox-mark"></span>
      </div>
      <span className="ml-2">{label}</span>
    </label>
  );
}