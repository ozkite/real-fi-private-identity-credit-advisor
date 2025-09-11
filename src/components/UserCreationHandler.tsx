"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/UnifiedAuthProvider";
import { getUTMParametersForRegistration } from "@/utils/utmTracking";

/**
 * Component that automatically creates users in nilDB when they first access the app
 * This handles both Supabase and Privy users who haven't been created in nilDB yet
 */
export default function UserCreationHandler() {
  const { user } = useAuth();
  const hasAttemptedCreation = useRef(false);

  useEffect(() => {
    // Only run if user is authenticated and we haven't attempted creation yet
    if (!user?.isAuthenticated || !user?.id || hasAttemptedCreation.current) {
      return;
    }

    hasAttemptedCreation.current = true;

    const createUserInNilDB = async () => {
      try {
        // Get UTM parameters for user registration
        const utmParams = getUTMParametersForRegistration();
        const requestBody =
          Object.keys(utmParams).length > 0 ? { utm: utmParams } : {};

        const response = await fetch("/api/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:
            Object.keys(requestBody).length > 0
              ? JSON.stringify(requestBody)
              : undefined,
        });

        const result = await response.json();

        if (response.ok) {
          if (result.userExists) {
            console.log("User already exists in nilDB");
          } else {
            console.log("User created in nilDB successfully");
          }
        } else {
          console.error("Error creating user in nilDB:", result.error);
        }
      } catch (error) {
        console.error("Network error creating user in nilDB:", error);
      }
    };

    // Small delay to ensure auth state is fully settled
    const timeoutId = setTimeout(createUserInNilDB, 1000);

    return () => clearTimeout(timeoutId);
  }, [user?.isAuthenticated, user?.id]);

  // This component doesn't render anything
  return null;
}
