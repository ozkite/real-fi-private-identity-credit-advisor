import type { IChatItem } from "@/types/chat";
import { LOCAL_STORAGE_KEY_MAP } from "./constants";

export const LocalStorageService = {
  getChatHistory: (): IChatItem[] => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY_MAP.CHAT_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error parsing chat history from localStorage:", error);
      return [];
    }
  },

  setChatHistory: (chatHistory: IChatItem[]): void => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_MAP.CHAT_HISTORY,
        JSON.stringify(chatHistory),
      );
    } catch (error) {
      console.error("Error saving chat history to localStorage:", error);
    }
  },

  addChatToHistory: (chat: IChatItem): void => {
    const current = LocalStorageService.getChatHistory();
    LocalStorageService.setChatHistory([chat, ...current]);
  },

  removeUntitledChats: (): void => {
    const current = LocalStorageService.getChatHistory();
    const filtered = current.filter((chat) => chat.title !== "Untitled Chat");
    LocalStorageService.setChatHistory(filtered);
  },

  removeUntitledChatsNotIn: (idsToKeep: string[] | Set<string>): void => {
    const keep = new Set(idsToKeep);
    const current = LocalStorageService.getChatHistory();
    const filtered = current.filter(
      (chat) => chat.title !== "Untitled Chat" || keep.has(chat._id),
    );
    LocalStorageService.setChatHistory(filtered);
  },

  removeChatFromHistory: (chatId: string): void => {
    const current = LocalStorageService.getChatHistory();
    const filtered = current.filter((chat) => chat._id !== chatId);
    LocalStorageService.setChatHistory(filtered);
  },

  updateChatTitle: (chatId: string, newTitle: string): void => {
    const current = LocalStorageService.getChatHistory();
    const updated = current.map((chat) =>
      chat._id === chatId ? { ...chat, title: newTitle } : chat,
    );
    LocalStorageService.setChatHistory(updated);
  },
};
