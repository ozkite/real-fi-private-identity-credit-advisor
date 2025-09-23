"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import type { IChatItem } from "@/types/chat";
import { getPersonaFromUTM } from "@/utils/utmPersonaMapping";
import { getStoredUTMParameters } from "@/utils/utmTracking";
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
  chatHistory: IChatItem[];
  setChatHistory: Dispatch<SetStateAction<IChatItem[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState("personal-assistant");
  const [hasMessages, setHasMessages] = useState(false);
  const [userSecretKeySeed, setUserSecretKeySeed] = useState<string | null>(
    null,
  );
  const [wasAuthenticated, setWasAuthenticated] = useState<boolean | null>(
    null,
  );

  const [chatHistory, setChatHistory] = useState<IChatItem[]>([]);

  // Load passphrase from session storage on mount
  useEffect(() => {
    const storedPassphrase = sessionStorage.getItem("userSecretKeySeed");
    if (storedPassphrase) {
      setUserSecretKeySeed(storedPassphrase);
    }
  }, []);

  // Check UTM parameters and set persona accordingly (HIGHEST PRIORITY)
  useEffect(() => {
    const utmParams = getStoredUTMParameters();
    const personaFromUTM = getPersonaFromUTM(utmParams);

    if (personaFromUTM) {
      console.log(
        `UTM campaign detected: ${utmParams.utm_campaign}, setting persona to: ${personaFromUTM}`,
      );
      setSelectedPersona(personaFromUTM);
    }
  }, []);

  const toggleSidebar = () => {
    if (!user || !user.isAuthenticated) {
      return;
    }
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Custom setter that also saves to session storage
  const setUserSecretKeySeedWithStorage = (key: string) => {
    setUserSecretKeySeed(key);
    sessionStorage.setItem("userSecretKeySeed", key);
  };

  // Track authentication state changes and clear passphrase only on actual sign out
  useEffect(() => {
    const isCurrentlyAuthenticated = user?.isAuthenticated ?? false;

    // If this is the first time we're checking auth state, just record it
    if (wasAuthenticated === null) {
      setWasAuthenticated(isCurrentlyAuthenticated);
      return;
    }

    // If user was authenticated before and now is not, they signed out
    if (wasAuthenticated && !isCurrentlyAuthenticated) {
      setUserSecretKeySeed(null);
      sessionStorage.removeItem("userSecretKeySeed");
      setIsSidebarCollapsed(true); // Collapse sidebar on sign out
    }

    // Update the previous state
    setWasAuthenticated(isCurrentlyAuthenticated);
  }, [user, wasAuthenticated]);

  const value: AppContextType = {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    toggleSidebar,
    selectedPersona,
    setSelectedPersona,
    hasMessages,
    setHasMessages,
    userSecretKeySeed,
    setUserSecretKeySeed: setUserSecretKeySeedWithStorage,
    chatHistory,
    setChatHistory,
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
