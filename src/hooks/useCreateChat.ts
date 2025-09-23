"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useApp } from "@/contexts/AppContext";
import { LocalStorageService } from "@/services/LocalStorage";

const useCreateChat = () => {
  const { setChatHistory } = useApp();
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const router = useRouter();

  const createChat = async () => {
    setIsCreatingChat(true);
    const newChat = { _id: uuidv4(), title: "Untitled Chat" };

    LocalStorageService.addChatToHistory(newChat);

    // Optimistic update
    setChatHistory((prev) => [newChat, ...prev]);

    router.push(`/app/chat/${newChat._id}`);

    setTimeout(() => {
      setIsCreatingChat(false);
    }, 500);
  };
  return { isCreatingChat, setIsCreatingChat, createChat };
};

export default useCreateChat;
