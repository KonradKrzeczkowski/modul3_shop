"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import NexusHub from "@/components/icons/nexusHub";
export default function Login() {
  const [step, setStep] = useState<1 | 2>(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [error, setError] = useState("");
  const handleStep1Submit = async () => {
    setServerError(null);
    if (!emailOrPhone) {
      setServerError("Enter your email or phone.");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = async () => {
    setServerError(null);
    const res = await signIn("credentials", {
      emailOrPhone,
      password,
      redirect: false,
      callbackUrl: "/",
    });
    if (res?.error) {
      setError("Incorrect email/phone number or password.");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="md:w-[448px] mx-auto ">
      <div className="flex justify-center mb-8">
       <NexusHub/>
      </div>
      <div className="border rounded-[6px] p-6 border-gray-200 bg-base mb-20">
        {step === 1 && (
          <div className=" ">
            <h2 className="text-[24px] font-medium mb-6">Sign in</h2>
            <hr className="mb-8 border-gray-200" />

            <label className="text-[18px] text-neutral-900 font-medium mb-4 block">
              Email or mobile phone number
            </label>
            <input
              type="text"
              placeholder="Email or mobile phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full border border-gray-400 rounded py-3.5 px-5 mb-8 text-neutral-500"
            />

            <button
              className="w-full bg-primary-500 text-base py-3 rounded text-base font-medium"
              onClick={handleStep1Submit}
            >
              Continue
            </button>
            <div className="mt-6 text-neutral-600 text-[14px]">
              <span>
                Don’t have an account?
                <Link className="text-[16px]" href="/registration">
                  {" "}
                  Register
                </Link>
              </span>
            </div>
            {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
          </div>
        )}

        {step === 2 && (
          <div className="mt-8 p-6">
            <h2 className="text-[24px] font-medium mb-6">Sign in</h2>
            <hr className="mb-8 border-gray-300" />

            <label className="text-[18px] font-medium mb-4 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 rounded py-3.5 px-5 mb-8 text-neutral-500"
            />

            <div className="flex justify-between items-center mb-8">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={savePassword}
                  onChange={() => setSavePassword(!savePassword)}
                  className="w-4 h-4"
                />
                <span className="text-base font-normal">Save password</span>
              </label>
              <button className="text-primary-500 text-base font-normal">
                Forgot your password?
              </button>
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              className="w-full bg-primary-500 text-white py-3 rounded text-base font-medium"
              onClick={handleStep2Submit}
            >
              Sign in
            </button>

            {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
