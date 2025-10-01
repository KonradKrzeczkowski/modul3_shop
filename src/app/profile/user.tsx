"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Account from "@/components/icons/account";
 import { signOut } from "next-auth/react";
const User = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Ładowanie...</p>;
  if (!session) return <p>Nie jesteś zalogowany</p>;
const handleLogout = () => {
  signOut({
    redirect: true,     
    callbackUrl: "/login",      
  });
};

  return (
    <div className=" h-[260px] border rounded-[6px] border-gray-200 bg-base p-6 g-6">
      <div className="flex flex-col gap-6 border-b border-gray-200 pb-6">
        <div>
       <Account/>
        </div>
        <div className="flex flex-col justify-center"><p className="text-neutral-900">{session?.user?.name??"User"}</p>
        <p className="text-[14px] text-neutral-600">{session?.user?.email}</p>
        </div>
      </div>
      <button onClick={handleLogout} className="text-neutral-600 p-6">Logout</button>
    </div>
  );
};

export default User;
