"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import SuccessfullyRegister from "./successfullyRegister";
import { InputForm } from "./InputForm";
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
          country: data.country,
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

  return isRegistered ? (
    <SuccessfullyRegister />
  ) : (
    <div className="flex flex-col mx-auto md:w-[448px] mb-[77px] w-full w-max-[448px]">
      {" "}
      <div className=" flex justify-center mb-8 ">
        <Image src="/home/nexushub.svg" alt="Logo" width={199} height={50} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-6 p-2 flex flex-col mx-auto md:w-[448px] border border-gray-200 rounded-[6px] bg-base"
      >
        <h2 className="text-xl font-semibold mb-5">Create account</h2>
        <hr className="mb-8" />
        <InputForm
          label="Email"
          type="email"
          placeholder="Your email"
          register={register("email", {
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
          error={errors.email}
        />
        <InputForm
          label="Mobile Number"
          type="text"
          placeholder="Mobile Number"
          register={register("mobile", {
            required: "Please enter your phone number.",
            pattern: {
              value: /^\+\d{1,3}\d{10}$/,
              message: "Please enter your phone number.",
            },
            validate: async (value) => {
              try {
                const res = await fetch(
                  `/api/users/checkEmail?phone=${encodeURIComponent(value)}`
                );
                const data = await res.json();
                if (data.phoneExists) {
                  return "This phone number is already registered.";
                }
                return true;
              } catch {
                return "Error checking phone.";
              }
            },
          })}
          error={errors.mobile}
        />
        <InputForm
          label="Password"
          type="password"
          placeholder="Password"
          register={register("password", {
            required:
              "Password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 number.",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "Password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 number.",
            },
          })}
          error={errors.password}
          helperText="Password at least 8 characters and includes 1 upper case, 1 lower case, and 1 number."
        />
        <InputForm
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          register={register("confirmPassword", {
            required: "Please enter confirm password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          error={errors.confirmPassword}
        />
        <label className="text-lg mb-2">Country or region</label>
        <select
          className={`w-full border rounded p-2 text-base mb-8  border-gray-400 bg-base text-gray-400`}
          {...register("country", { required: true })}
        >
          <option value="">Select a country</option>
          <option value="PL">Poland</option>
          <option value="US">United States</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
        </select>
        <div className="flex items-start mb-6">
          <input
            type="checkbox"
            className="mt-1 mr-2"
            {...register("agree", { required: true })}
          />
          <p className="text-sm">
            By creating an account and check, you agree to the{" "}
            <span className="text-orange-500 font-medium">
              Conditions of Use
            </span>{" "}
            and{" "}
            <span className="text-orange-500 font-medium">Privacy Notice</span>.
          </p>
        </div>

        <button
          type="submit"
          className="bg-primary-500 text-white rounded-xl py-2 px-4 shadow-md hover:bg-blue-700"
        >
          Create Account
        </button>

        {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
      </form>
    </div>
  );
}
