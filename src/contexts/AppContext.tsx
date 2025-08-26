"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./UnifiedAuthProvider";

interface AppContextType {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  selectedPersona: string;
  setSelectedPersona: (persona: string) => void;
  hasMessages: boolean;
  setHasMessages: (hasMessages: boolean) => void;
  userSecretKeySeed: string | null;
  setUserSecretKeySeed: (key: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState("companion");
  const [hasMessages, setHasMessages] = useState(false);
  const [userSecretKeySeed, setUserSecretKeySeed] = useState<string | null>(
    null,
  );

  const toggleSidebar = () => {
    if (!user || !user.isAuthenticated) {
      return;
    }
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Clear userSecretKeySeed when user signs out
  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      setUserSecretKeySeed(null);
    }
  }, [user]);

  const value: AppContextType = {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    toggleSidebar,
    selectedPersona,
    setSelectedPersona,
    hasMessages,
    setHasMessages,
    userSecretKeySeed,
    setUserSecretKeySeed,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
