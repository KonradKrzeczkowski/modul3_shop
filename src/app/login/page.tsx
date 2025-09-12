"use client";

import { useState } from "react";
import Image from "next/image";




export default function Login() {
  const [step, setStep] = useState<1 | 2>(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleStep1Submit = async () => {
    setServerError(null);
    try {
      const res = await fetch(`/api/users/checkEmail?email=${emailOrPhone}&phone=${emailOrPhone}`);
      const data = await res.json();

      if (!data.exists) {
        setServerError("This email or phone number does not exist.");
        return;
      }

      setStep(2);
    } catch  {
      setServerError("Error checking email or phone.");
    }
  };


  const handleStep2Submit = async () => {
    setServerError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Login failed.");
        return;
      }

      console.log("Login successful", data);
    } catch  {
      setServerError("Login failed.");
    }
  };

  return (
    <div className="w-[448px] mx-auto">
      
      <div className="flex justify-center mt-0">
        <Image src="/home/nexushub.svg" alt="Logo" width={199} height={50} />
      </div>

      {step === 1 && (
        <div className="mt-8 p-6">
          <h2 className="text-[24px] font-medium mb-6">Sign in</h2>
          <hr className="mb-8 border-gray-300" />

          <label className="text-[18px] font-medium mb-4 block">Email or mobile phone number</label>
          <input
            type="text"
            placeholder="Email or mobile phone number"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full border rounded p-[14px] mb-8 text-base"
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded text-base font-medium"
            onClick={handleStep1Submit}
          >
            Continue
          </button>

          {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 p-6">
          <h2 className="text-[24px] font-medium mb-6">Sign in</h2>
          <hr className="mb-8 border-gray-300" />

          <label className="text-[18px] font-medium mb-4 block">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-[14px] mb-6 text-base"
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
            <button className="text-orange-500 text-base font-normal">
              Forgot your password?
            </button>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded text-base font-medium"
            onClick={handleStep2Submit}
          >
            Sign in
          </button>

          {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
        </div>
      )}
    </div>
  );
}