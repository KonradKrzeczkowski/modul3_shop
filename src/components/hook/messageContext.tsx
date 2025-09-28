"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MessageContextType = {
  message: string;
  setMessage: (msg: string) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");

       return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within MessageProvider");
  }
  return context;
}