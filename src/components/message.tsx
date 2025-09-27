"use client";
import { useEffect, useState } from "react";
import { useMessage } from "./hook/messageContext";
import AlertGreen from "./icons/alertGreen";
import Cross from "./icons/cross";
export default function Message() {
  const [visible, setVisible] = useState(false);
  const { message, setMessage } = useMessage();

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible || message.length < 1) return null;

  return (
    <div className=" flex justify-between bottom-4 right-4 bg-success-50 border  border-success-400 text-white px-4 py-2 rounded shadow-lg h-[66px] mx-[40px] mb-[20px] items-center">
      <div className="flex gap-4">
        <AlertGreen />
        <span className="text-[20px] text-neutral-900">{message}</span>{" "}
      </div>
      <button onClick={() => setMessage("")}>
        <Cross />
      </button>
    </div>
  );
}
