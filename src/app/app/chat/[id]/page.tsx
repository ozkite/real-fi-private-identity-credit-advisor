"use client";

import { useEffect, useState } from "react";
import { SecretKeyModal } from "@/components/auth/SecretKeyModal";
import StreamingChatArea from "@/components/chat/StreamingChatArea";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/UnifiedAuthProvider";
import { useEncryption } from "@/hooks/useEncryption";

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const { selectedPersona, userSecretKeySeed } = useApp();

  // biome-ignore lint/suspicious/noExplicitAny: TODO: add type
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasDecryptionFailures, setHasDecryptionFailures] = useState(false);
  const [showSecretKeyModal, setShowSecretKeyModal] = useState(false);
  const { user } = useAuth();
  const { decryptWithStatus, hasSecretKey } = useEncryption();

  useEffect(() => {
    const fetchChatMessages = async (chatId: string) => {
      setLoading(true);
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        const response = await fetch(`/api/getChatMessages/${chatId}`, {
          method: "GET",
          headers,
        });
        const data = await response.json();
        const fetchedMessages = data.content || [];

        // Decrypt messages if user has secret key
        if (hasSecretKey && fetchedMessages.length > 0) {
          let failedDecryptions = 0;
          const decryptedMessages = await Promise.all(
            // biome-ignore lint/suspicious/noExplicitAny: TODO: add type
            fetchedMessages.map(async (message: any) => {
              const result = await decryptWithStatus(message.content);
              if (!result.decryptComplete) {
                failedDecryptions++;
              }
              return {
                ...message,
                content: result.content,
                attachments: message?.attachments,
              };
            }),
          );
          setHasDecryptionFailures(failedDecryptions > 0);
          setMessages(decryptedMessages);
        } else {
          // No secret key or no messages, use original content
          setHasDecryptionFailures(false);
          setMessages(fetchedMessages);
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchChatMessages(params.id);
    } else {
      setLoading(false);
      setMessages([]);
      return;
    }
  }, [params.id, user, userSecretKeySeed, decryptWithStatus, hasSecretKey]);

  // Show loading if fetching messages (but not if just waiting for secret key)
  if (loading && userSecretKeySeed) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600 text-center">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {userSecretKeySeed ? (
          <>
            {hasDecryptionFailures && (
              <div className="bg-[#ECE9DF] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <p className="text-sm font-medium text-gray-700">
                      This chat could not be decrypted with the current
                      passphrase
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSecretKeyModal(true)}
                    className="ml-4 px-4 py-2 bg-[#FFC971] text-black text-sm font-medium rounded-full hover:bg-[#FFD584] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC971]"
                  >
                    Update Passphrase
                  </button>
                </div>
              </div>
            )}
            <div className="flex-1 min-h-0">
              <StreamingChatArea
                key={params.id}
                model={selectedPersona}
                initialMessages={messages}
                chatId={params.id}
                hasDecryptionFailures={hasDecryptionFailures}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full p-6">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-gray-600 text-center">
                Please enter your passphrase to continue...
              </p>
            </div>
          </div>
        )}
      </div>

      <SecretKeyModal
        isOpen={
          (!!user && user.isAuthenticated && !userSecretKeySeed) ||
          showSecretKeyModal
        }
        onClose={() => {
          setShowSecretKeyModal(false);
        }}
      />
    </>
  );
}
