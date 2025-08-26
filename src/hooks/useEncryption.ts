"use client";

import { useCallback } from "react";
import { useApp } from "@/contexts/AppContext";
import { decryptMessage, encryptMessage } from "@/lib/encryption/blindfold";

export function useEncryption() {
  const { userSecretKeySeed } = useApp();

  const encrypt = useCallback(
    async (message: string): Promise<string> => {
      if (!userSecretKeySeed) {
        throw new Error(
          "No secret key seed available. User must be authenticated and have entered their key.",
        );
      }
      return encryptMessage(message, userSecretKeySeed);
    },
    [userSecretKeySeed],
  );

  const decrypt = useCallback(
    async (encryptedMessage: string): Promise<string> => {
      if (!userSecretKeySeed) {
        // If no secret key available, return the original string
        return encryptedMessage;
      }
      const result = await decryptMessage(encryptedMessage, userSecretKeySeed);
      return result.content;
    },
    [userSecretKeySeed],
  );

  const decryptWithStatus = useCallback(
    async (
      encryptedMessage: string,
    ): Promise<{ content: string; decryptComplete: boolean }> => {
      if (!userSecretKeySeed) {
        // If no secret key available, return the original string with failure status
        return { content: encryptedMessage, decryptComplete: false };
      }
      return decryptMessage(encryptedMessage, userSecretKeySeed);
    },
    [userSecretKeySeed],
  );

  return {
    encrypt,
    decrypt,
    decryptWithStatus,
    hasSecretKey: !!userSecretKeySeed,
  };
}
