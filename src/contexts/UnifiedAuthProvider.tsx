"use client";

import { usePrivy } from "@privy-io/react-auth";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface UnifiedUser {
  id: string;
  email?: string;
  name?: string;
  walletAddress?: string;
  authProvider: "supabase" | "privy";
  isAuthenticated: boolean;
}

type AuthContextType = {
  user: UnifiedUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string,
    emailConsent: boolean,
  ) => Promise<string | undefined>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function UnifiedAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UnifiedUser | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const { authenticated, user: privyUser, logout } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const supabaseActive = !!supabaseUser;
    const privyActive = !!(authenticated && privyUser);

    let unifiedUser: UnifiedUser | null = null;

    if (supabaseActive) {
      unifiedUser = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name:
          supabaseUser.user_metadata?.name ||
          supabaseUser.user_metadata?.full_name,
        authProvider: "supabase",
        isAuthenticated: true,
      };
    } else if (privyActive) {
      unifiedUser = {
        id: privyUser.id,
        email: privyUser.email?.address,
        walletAddress: privyUser.wallet?.address,
        authProvider: "privy",
        isAuthenticated: true,
      };
    }

    setUser(unifiedUser);
  }, [supabaseUser, authenticated, privyUser]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    router.push("/app");
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    emailConsent: boolean,
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: {
          name: name,
          email_consent: emailConsent,
        },
      },
    });

    if (error) throw error;
    return data?.user?.id;
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase signout error:", error);
      }
      if (authenticated && privyUser) {
        await logout();
      }

      router.push("/app");
    } catch (err) {
      console.error("Signout error:", err);
      router.push("/app");
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an UnifiedAuthProvider");
  }
  return context;
}
