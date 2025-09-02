import { LOCAL_STORAGE_KEY_MAP } from "./constants";

interface ChatItem {
  _id: string;
  title: string;
}

export const LocalStorageService = {
  getChatHistory: (): ChatItem[] => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY_MAP.CHAT_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error parsing chat history from localStorage:", error);
      return [];
    }
  },

  setChatHistory: (chatHistory: ChatItem[]): void => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_MAP.CHAT_HISTORY,
        JSON.stringify(chatHistory),
      );
    } catch (error) {
      console.error("Error saving chat history to localStorage:", error);
    }
  },

  addChatToHistory: (chat: ChatItem): void => {
    const current = LocalStorageService.getChatHistory();
    LocalStorageService.setChatHistory([chat, ...current]);
  },

  removeUntitledChats: (): void => {
    const current = LocalStorageService.getChatHistory();
    const filtered = current.filter((chat) => chat.title !== "Untitled Chat");
    LocalStorageService.setChatHistory(filtered);
  },
};
