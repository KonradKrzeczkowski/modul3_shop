"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import SuccessfullyRegister from "./successfullyRegister";
type FormData = {
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  address?: string;
  country: string;
  agree: boolean;
};

export default function Form() {
    const [isRegistered, setIsRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setServerError(null);

    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          phone: data.mobile,
          password: data.password,
          address: data.address,
        }),
      });

    
      let result: { error?: string } = {};
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        result = await res.json();
      } else {
        const text = await res.text();
        result.error = text || "Server did not return JSON";
      }

   if (!res.ok) {
  if (result.error && typeof result.error === "string") {
    console.error("Server response:", result?.error);
    setServerError(result.error);
  } else {
    console.error("Server response:", result);
  }
}

      setIsRegistered(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Something went wrong");
      }
    }
  };

  return (
    isRegistered ? (<SuccessfullyRegister/>) :
      ( <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 flex flex-col mx-auto"
      style={{ width: "448px" }}
    >
 <div className="mb-8">
        <Image src="/home/nexushub.svg" alt="Logo" width={120} height={40} />
      </div>
 <h2 className="text-xl font-semibold mb-5">Create account</h2>
 <hr className="mb-8" />
 {/* Email */}
     <label className="text-lg mb-2">Email</label>
<input
  type="email"
  placeholder="Your email"
  className={`w-full border rounded p-2 text-base pl-5 mb-2 ${
    errors.email ? "border-red-500" : ""
  }`}
  {...register("email", {
    required: "Please enter a valid email address.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address.",
    },
    validate: async (value) => {
      try {
        const res = await fetch(`/api/users/checkEmail?email=${value}`);
        const data = await res.json();
        if (data.emailExists) {
          return "This email is already registered.";
        }
        return true;
      } catch {
        return "Error checking email.";
      }
    },
  })}
/>
{errors.email && (
  <p className="text-red-500 text-sm mb-6">{errors.email.message}</p>
)}
      {/* Mobile */}
   <label className="text-lg mb-2">Mobile Number</label>
<input
  type="text"
  placeholder={
    errors.mobile
      ? "+(Code country) 10 digit mobile number"
      : "Mobile Number"
  }
  className={`w-full border rounded p-2 text-base pl-5 mb-2 ${
    errors.mobile ? "border-red-500" : ""
  }`}
  {...register("mobile", {
    required: "Please enter your phone number.",
    pattern: {
      value: /^\+\d{1,3}\d{10}$/,
      message: "Please enter your phone number.",
    },
validate: async (value) => {
  try {
    const res = await fetch(`/api/users/checkEmail?phone=${encodeURIComponent(value)}`);
    const data = await res.json();
    if (data.phoneExists) {
      return "This phone number is already registered.";
    }
    return true;
  } catch {
    return "Error checking phone.";
  }
}
  })}
/>
{errors.mobile && (
  <p className="text-red-500 text-sm mb-6">{errors.mobile.message}</p>
)}
       {/* Password  */}
      <label className="text-lg mb-2">Password</label>
      <input
        type="password"
        placeholder="Password"
        className={`w-full border rounded p-2 text-base pl-5 mb-2 ${
          errors.password ? "border-red-500" : ""
        }`}
        {...register("password", {
          required:
            "Password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 number.",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message:
              "Password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 number.",
          },
        })}
      />
      <p className="text-sm font-normal mt-2 mb-2">
        Password at least 8 characters and includes 1 upper case, 1 lower
        case, and 1 number.
      </p>
      {errors.password && (
        <p className="text-red-500 text-sm mb-6">{errors.password.message}</p>
      )}

      {/* Confirm Password */}
      <label className="text-lg mb-2">Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm Password"
        className={`w-full border rounded p-2 text-base pl-5 mb-2 ${
          errors.confirmPassword ? "border-red-500" : ""
        }`}
        {...register("confirmPassword", {
          required: "Please enter confirm password",
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        })}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm mb-6">
          {errors.confirmPassword.message}
        </p>
      )}

      {/* Country */}
      <label className="text-lg mb-2">Country or region</label>
      <select
        className={`w-full border rounded p-2 text-base mb-8 ${
          errors.address ? "border-red-500" : ""
        }`}
        {...register("address", { required: true })}
      >
        <option value="">Select a country</option>
        <option value="PL">Poland</option>
        <option value="US">United States</option>
        <option value="DE">Germany</option>
        <option value="FR">France</option>
      </select>

      {/* Checkbox */}
      <div className="flex items-start mb-6">
        <input
          type="checkbox"
          className="mt-1 mr-2"
          {...register("agree", { required: true })}
        />
        <p className="text-sm">
          By creating an account and check, you agree to the{" "}
          <span className="text-orange-500 font-medium">Conditions of Use</span>{" "}
          and{" "}
          <span className="text-orange-500 font-medium">Privacy Notice</span>.
        </p>
      </div>

   
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-xl py-2 px-4 shadow-md hover:bg-blue-700"
      >
        Create Account
      </button>

      {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
    </form>)
  
  );
}