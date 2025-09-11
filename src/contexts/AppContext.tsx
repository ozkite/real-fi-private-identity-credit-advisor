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
  const [selectedPersona, setSelectedPersona] = useState("personal-assistant");
  const [hasMessages, setHasMessages] = useState(false);
  const [userSecretKeySeed, setUserSecretKeySeed] = useState<string | null>(
    null,
  );
  const [wasAuthenticated, setWasAuthenticated] = useState<boolean | null>(
    null,
  );

  // Load passphrase from session storage on mount
  useEffect(() => {
    const storedPassphrase = sessionStorage.getItem("userSecretKeySeed");
    if (storedPassphrase) {
      setUserSecretKeySeed(storedPassphrase);
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
