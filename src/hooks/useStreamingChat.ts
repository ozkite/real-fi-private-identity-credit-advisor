import { useCallback, useState } from "react";
import type { IChatMessage } from "../types/chat";

export interface UseStreamingChatOptions {
  shouldUseWebSearch?: boolean;
  onUpdate?: (content: string) => void;
  onComplete?: (content: string) => void;
  onError?: (error: string) => void;
}

export function useStreamingChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(
    async (
      messages: IChatMessage[],
      options: UseStreamingChatOptions = {},
      persona?: string,
    ): Promise<string> => {
      const { onUpdate, onComplete, onError, shouldUseWebSearch } = options;

      setIsLoading(true);
      setIsStreaming(false);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages,
            stream: true,
            persona,
            web_search: !!shouldUseWebSearch,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No reader available");
        }

        const decoder = new TextDecoder();
        let accumulatedContent = "";

        setIsLoading(false);
        setIsStreaming(true);

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              const trimmedLine = line.trim();

              if (trimmedLine === "") continue;
              if (trimmedLine === "data: [DONE]") continue;

              if (trimmedLine.startsWith("data: ")) {
                try {
                  const jsonStr = trimmedLine.slice(6);
                  const parsed = JSON.parse(jsonStr);

                  const content = parsed.choices?.[0]?.delta?.content || "";

                  if (content) {
                    accumulatedContent += content;
                    onUpdate?.(accumulatedContent);
                  }
                } catch (parseError) {
                  console.warn("Failed to parse streaming chunk:", parseError);
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }

        setIsStreaming(false);
        onComplete?.(accumulatedContent);
        return accumulatedContent;
      } catch (error) {
        setIsLoading(false);
        setIsStreaming(false);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        onError?.(errorMessage);
        throw error;
      }
    },
    [],
  );

  return {
    sendMessage,
    isLoading,
    isStreaming,
  };
}
