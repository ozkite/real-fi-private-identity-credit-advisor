import { decrypt, encrypt, SecretKey } from "@nillion/blindfold";

/**
 * Encrypts a message using Nillion Blindfold with the provided secret key seed
 * @param message - The plaintext message to encrypt
 * @param secretKeySeed - The user's secret key seed for encryption
 * @returns The encrypted message as a base64-encoded string
 */

export async function encryptMessage(
  message: string,
  secretKeySeed: string,
): Promise<string> {
  if (!message || !secretKeySeed) {
    throw new Error(
      "Both message and secretKeySeed are required for encryption",
    );
  }

  if (typeof window === "undefined") {
    console.warn("Encryption is not available on the server");
    return message;
  }

  try {
    if (new TextEncoder().encode(message).length > 4096) {
      throw new Error("Message must be 4096 bytes or less");
    }

    const cluster = { nodes: [{}] };

    const key = await SecretKey.generate(
      cluster,
      { store: true },
      null,
      secretKeySeed,
    );

    const ciphertext = await encrypt(key, message);

    return typeof ciphertext === "string"
      ? ciphertext
      : JSON.stringify(ciphertext);
  } catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }
}

/**
 * Decrypts a message using Nillion Blindfold with the provided secret key seed
 * @param encryptedMessage - The encrypted message to decrypt
 * @param secretKeySeed - The user's secret key seed for decryption
 * @returns An object with the decrypted content and a success flag
 */

export async function decryptMessage(
  encryptedMessage: string,
  secretKeySeed: string,
): Promise<{ content: string; decryptComplete: boolean }> {
  if (!encryptedMessage || !secretKeySeed) {
    return { content: encryptedMessage || "", decryptComplete: false };
  }

  if (typeof window === "undefined") {
    return { content: encryptedMessage, decryptComplete: false };
  }

  try {
    const ciphertext =
      encryptedMessage.startsWith("[") || encryptedMessage.startsWith("{")
        ? JSON.parse(encryptedMessage)
        : encryptedMessage;

    const cluster = { nodes: [{}] };

    const key = await SecretKey.generate(
      cluster,
      { store: true },
      null,
      secretKeySeed,
    );

    const plaintext = await decrypt(key, ciphertext);
    return { content: plaintext as string, decryptComplete: true };
  } catch (error) {
    console.error("Decryption error:", error);
    // If any error occurs during decryption, return the original string
    return { content: encryptedMessage, decryptComplete: false };
  }
}
