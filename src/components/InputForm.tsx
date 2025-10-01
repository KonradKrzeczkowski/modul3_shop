import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  helperText?: string;
};

export const InputForm   = ({
  label,
  type = "text",
  placeholder,
  register,
  error,
  helperText,
}:FormInputProps) => {
  return (
    <div className="w-full mb-4">
      <label className="text-[18px] text-neutral-900 mb-2 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border border-gray-400 text-neutral-900 rounded p-2 text-base pl-5 mb-1 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
        {...register}
      />
      {helperText && !error && (
        <p className="text-sm font-normal mt-1 mb-1">{helperText}</p>
      )}
      {error && <p className="text-danger-300 text-sm">{error.message}</p>}
    </div>
  );
};