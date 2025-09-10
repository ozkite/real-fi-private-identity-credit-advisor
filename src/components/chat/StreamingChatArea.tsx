"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_MODEL } from "@/config/personas";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/UnifiedAuthProvider";
import { useEncryption } from "@/hooks/useEncryption";
import { LocalStorageService } from "@/services/LocalStorage";
import { useStreamingChat } from "../../hooks/useStreamingChat";
import type { ChatMessage as MessageType } from "../../types/chat";
import type { TMessageAttachment } from "../../types/schemas";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

interface StreamingChatAreaProps {
  model: string;
  initialMessages?: MessageType[];
  chatId?: string | null;
  hasDecryptionFailures?: boolean;
}

interface ChatSuggestion {
  emoji: string;
  text: string;
}

const getChatSuggestions = (persona: string): ChatSuggestion[] => {
  const suggestions: Record<string, ChatSuggestion[]> = {
    "personal-assistant": [
      { emoji: "📅", text: "Help me plan my week" },
      { emoji: "📧", text: "Draft an email for me" },
      { emoji: "📝", text: "I need an agenda for my meeting" },
    ],
    "wellness-assistant": [
      { emoji: "😌", text: "I'm feeling stressed..." },
      { emoji: "💤", text: "How can I sleep better?" },
      { emoji: "🧘", text: "Guide me through a meditation session" },
    ],
    companion: [
      { emoji: "👋", text: "Hey, how was your day?" },
      { emoji: "🃏", text: "Want to play a game?" },
      { emoji: "🎬", text: "What movie would you recommend?" },
    ],
  };

  return suggestions[persona] || suggestions.companion;
};

const StreamingChatArea: React.FC<StreamingChatAreaProps> = ({
  initialMessages = [],
  chatId: initialChatId = null,
  hasDecryptionFailures = false,
}) => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [chatId, setChatId] = useState<string | null>(initialChatId);
  const [isUpdatingChat, setIsUpdatingChat] = useState(false);
  const chatIdRef = useRef<string | null>(initialChatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isLoading, isStreaming } = useStreamingChat();
  const { user } = useAuth();
  const { setHasMessages, selectedPersona } = useApp();
  const { encrypt, hasSecretKey } = useEncryption();

  /*
   CHAT
    1. Create Chat (createInitialChat)
        If message_count === 2 (1st user + assistant message)
        Just store in messages. 

    2. Update Chat with Title (updateChatTitle)
        If message_count === 4 (2nd user + assistant message)
        We have enough context to summarize the chat for a title

    3. Update chat for message_count purpose (updateChat)
        If message_count > 4, we can just keep updating message_count
*/

  const createInitialChat = async () => {
    // 1. Check if user is authenticated
    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    // 2. Create Chat with title "null"
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const response = await fetch("/api/createChat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: "null",
          message_count: 2,
          persona: selectedPersona,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        console.error("Error creating CHATS:", result.error);
      }
    } catch (error) {
      console.error("Network error creating chat:", error);
    }
  };

  const updateChatTitle = async () => {
    // 1. Call LLM Chat API for summary
    let title = null;

    const summaryMessage: MessageType = {
      role: "user",
      content: "Summarize this conversation in three words or less",
    };

    try {
      const summaryContent = await sendMessage(
        [...messages, summaryMessage],
        {},
        selectedPersona,
      );
      title = summaryContent;
    } catch (error) {
      console.error("Error generating title:", error);
      title = "New Chat";
    }

    // 2. Check if user is authenticated
    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    // 3. Encrypt the title if user has secret key
    let encryptedTitle = title;
    if (hasSecretKey && title) {
      try {
        encryptedTitle = await encrypt(title);
      } catch (error) {
        console.error("Error encrypting title:", error);
        encryptedTitle = title;
      }
    }

    // 4. Store in database
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const response = await fetch("/api/updateChat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          _id: chatId,
          title: encryptedTitle,
          message_count: 4,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        console.error("Error updating chat title:", result.error);
      }
    } catch (error) {
      console.error("Network error updating chat title:", error);
    }
  };

  const updateChatCount = async (messageCount: number) => {
    // 2. Check if user is authenticated
    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    // 3. Update Chat via DB
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const response = await fetch("/api/updateChat", {
        method: "POST",
        headers,
        body: JSON.stringify({
          _id: chatId,
          message_count: messageCount,
          noTitle: true,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        console.error("Error creating CHATS:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const createMessage = async (message: {
    chatId: string;
    role: "user" | "assistant";
    content: string;
    order: number;
    attachments?: TMessageAttachment[];
  }) => {
    const { chatId, role, content, order, attachments } = message;

    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    try {
      // Encrypt the content if the user has a secret key
      let blindfoldContent = content; // Default to plaintext
      if (hasSecretKey) {
        try {
          blindfoldContent = await encrypt(content);
        } catch (error) {
          console.warn("Encryption failed, storing as plaintext:", error);
          blindfoldContent = content;
        }
      }

      const response = await fetch("/api/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          role: role,
          content: content,
          order: order,
          timestamp: new Date().toISOString(),
          model: DEFAULT_MODEL,
          creator: user?.id,
          blindfoldContent: blindfoldContent,
          attachments,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        console.error("Error creating message:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const scrollToBottom = useCallback(
    (force = false) => {
      if (chatContainerRef.current) {
        const { scrollHeight, clientHeight, scrollTop } =
          chatContainerRef.current;
        const isScrolledNearBottom =
          scrollHeight - scrollTop - clientHeight < 150;

        if (force || isScrolledNearBottom || isStreaming) {
          messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }
    },
    [isStreaming],
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming, scrollToBottom]);

  useEffect(() => {
    setHasMessages(messages.length > 0);
  }, [messages, setHasMessages]);

  // Update messages when initialMessages changes
  useEffect(() => {
    // Only update if we don't have messages yet, or if initialMessages is different
    if (messages.length === 0 && initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages, messages.length]);

  const handleSendMessage = async (content: string, imageDataUrl?: string) => {
    if (!user) {
      console.error("No authenticated user found");
      return;
    }

    if (!content.trim()) return;

    const userMessage: MessageType = {
      role: "user",
      content: imageDataUrl
        ? [
            { type: "image_url", image_url: { url: imageDataUrl } },
            { type: "text", text: content },
          ]
        : content,
    };
    const userMessageContentText =
      typeof userMessage.content === "string"
        ? userMessage.content
        : userMessage.content.find((content) => content.type === "text")
            ?.text || "";
    const userMessageAttachments: TMessageAttachment[] = imageDataUrl
      ? ["image"]
      : [];

    setMessages((prev) => [
      ...prev,
      {
        ...userMessage,
        content: userMessageContentText,
        attachments: userMessageAttachments,
      },
    ]);

    setTimeout(() => scrollToBottom(true), 100);

    const assistantMessage: MessageType = {
      role: "assistant",
      content: "",
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      await sendMessage(
        [...messages, userMessage],
        {
          onUpdate: (streamingContent) => {
            // Update the last message (assistant message) with streaming content
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: streamingContent,
              };
              return updated;
            });
          },
          onComplete: async (finalContent) => {
            // Ensure final content is set
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: finalContent,
              };
              return updated;
            });

            // Check if we should create a chat in the database
            const totalMessages = messages.length + 2;

            if (totalMessages === 2) {
              const newChatId = await createInitialChat();
              setChatId(newChatId.message);
              chatIdRef.current = newChatId.message;

              // Add the two messages to the chat
              await createMessage({
                chatId: newChatId.message,
                role: "user",
                content: userMessageContentText,
                order: 1,
                attachments: userMessageAttachments,
              });
              await createMessage({
                chatId: newChatId.message,
                role: "assistant",
                content: finalContent,
                order: 2,
              });
            }

            if (totalMessages === 4) {
              const currentChatId = chatIdRef.current || chatId;

              if (currentChatId) {
                await Promise.all([
                  createMessage({
                    chatId: currentChatId,
                    role: "user",
                    content: userMessageContentText,
                    order: totalMessages - 1,
                    attachments: userMessageAttachments,
                  }),
                  createMessage({
                    chatId: currentChatId,
                    role: "assistant",
                    content: finalContent,
                    order: totalMessages,
                  }),
                ]);

                setIsUpdatingChat(true);

                updateChatTitle()
                  .then(() => {
                    LocalStorageService.removeUntitledChats();

                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new Event("sidebar:refresh"));
                    }
                  })
                  .catch((error) => {
                    console.warn("Title update failed:", error);
                  })
                  .finally(() => {
                    setTimeout(() => {
                      setIsUpdatingChat(false);
                    }, 1000);
                  });
              }
            }

            if (totalMessages >= 5) {
              const currentChatId = chatIdRef.current || chatId;
              if (currentChatId) {
                await Promise.all([
                  // ODD (User)
                  (totalMessages - 1) % 2 === 1
                    ? createMessage({
                        chatId: currentChatId,
                        role: "user",
                        content: userMessageContentText,
                        order: totalMessages - 1,
                        attachments: userMessageAttachments,
                      })
                    : Promise.resolve(),

                  // EVEN (Assistant)
                  totalMessages % 2 === 0
                    ? createMessage({
                        chatId: currentChatId,
                        role: "assistant",
                        content: finalContent,
                        order: totalMessages,
                      })
                    : Promise.resolve(),
                ]);

                updateChatCount(totalMessages).catch((error) => {
                  console.warn("Count update failed:", error);
                });
              }
            }
          },
          onError: (error) => {
            console.error("Streaming error:", error);
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content:
                  "Sorry, I encountered an error. Please try again later.",
              };
              return updated;
            });
          },
        },
        selectedPersona,
      );
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        };
        return updated;
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F6F2]">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-full max-w-2xl">
              {!hasDecryptionFailures && (
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading || isStreaming || isUpdatingChat}
                  placeholder="What do you want to ask?"
                  showActionButtons={false}
                />
              )}
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {getChatSuggestions(selectedPersona).map(
                  (suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion.text)}
                      className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-left group w-fit"
                    >
                      <div className="text-lg">{suggestion.emoji}</div>
                      <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        {suggestion.text}
                      </span>
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-2 space-y-3 min-h-0"
          >
            <div className="max-w-4xl mx-auto space-y-3">
              {messages.map((message, index) => {
                const isLastMessage = index === messages.length - 1;
                const isAssistantStreaming =
                  isLastMessage && message.role === "assistant" && isStreaming;

                return (
                  <ChatMessage
                    key={index}
                    message={message}
                    isStreaming={isAssistantStreaming}
                  />
                );
              })}

              {isLoading && !isStreaming && (
                <div className="flex justify-start">
                  <div className="bg-[#F7F6F2] rounded-lg px-4 py-2 text-neutral-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>
          {!hasDecryptionFailures && (
            <div className="flex-shrink-0 p-2">
              <div className="max-w-4xl mx-auto w-full">
                <div className="max-w-2xl mx-auto">
                  <ChatInput
                    data-umami-event="chat-send-message-button"
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading || isStreaming || isUpdatingChat}
                    placeholder="What do you want to ask?"
                    showActionButtons={false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StreamingChatArea;
