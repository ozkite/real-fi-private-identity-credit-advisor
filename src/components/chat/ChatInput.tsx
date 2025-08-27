import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/UnifiedAuthProvider";
import PersonaSelector from "./PersonaSelector";
import { useApp } from "@/contexts/AppContext";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  showActionButtons?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  placeholder = "What do you want to ask?",
}) => {
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [wasLoading, setWasLoading] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isSidebarCollapsed, toggleSidebar, setSelectedPersona, hasMessages } =
    useApp();

  const handlePersonaChange = (personaId: string) => {
    setSelectedPersona(personaId);
  };

  // Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint (768px)
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Focus textarea when loading finishes
  useEffect(() => {
    if (wasLoading && !isLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
    setWasLoading(isLoading);
  }, [isLoading, wasLoading]);

  // Word count function
  const countWords = (text: string): number => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const wordCount = countWords(input);
  const isOverLimit = wordCount > 600;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isAuthenticated || isOverLimit) return;

    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // On mobile, Enter creates new line; only submit on desktop
    if (e.key === "Enter" && !e.shiftKey && !isMobile) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex flex-col">
        <div className="relative bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-3 pt-4 pb-2">
          {/* Text input at top */}
          <div className="mb-2">
            <textarea
              ref={textareaRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isAuthenticated === false
                  ? "Please sign in to chat."
                  : placeholder
              }
              className="w-full bg-transparent text-neutral-800 placeholder-neutral-400 resize-none focus:outline-none text-base leading-6 min-h-[36px] max-h-32 overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                height: "auto",
                minHeight: "36px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.max(
                  36,
                  Math.min(target.scrollHeight, 128),
                )}px`;
              }}
              disabled={isLoading || isAuthenticated === false}
            />
            <style jsx>{`
              textarea::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>

          {/* Bottom row with left and right sections */}
          <div className="flex items-center justify-between">
            {/* Left section - for future tools/features */}
            <div className="flex items-center gap-2">
              {/* Future: attachment button, tools, etc. */}
            </div>

            {/* Right section - PersonaSelector + Send button */}
            <div className="flex items-center gap-2">
              <PersonaSelector
                onPersonaChange={handlePersonaChange}
                disabled={hasMessages}
              />
              <button
                name="submitButton"
                type="submit"
                disabled={
                  isLoading ||
                  !input.trim() ||
                  isAuthenticated === false ||
                  isOverLimit
                }
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                  input.trim() && !isOverLimit && isAuthenticated
                    ? "bg-neutral-800 text-yellow-400 hover:bg-neutral-700"
                    : "bg-neutral-300 text-neutral-500"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transform"
                >
                  <path
                    d="M7 11L12 6L17 11M12 18V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isOverLimit && (
          <div className="mt-2 px-1">
            <p className="text-sm text-red-500">
              Reached 600 word limit. Please shorten your message to send.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatInput;
