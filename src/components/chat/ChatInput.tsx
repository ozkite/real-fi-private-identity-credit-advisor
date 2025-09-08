import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileSizeValidator,
  FileTypeValidator,
} from "use-file-picker/validators";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/UnifiedAuthProvider";
import PersonaSelector from "./PersonaSelector";

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

  const { setSelectedPersona, hasMessages } = useApp();

  const {
    openFilePicker,
    filesContent,
    loading: isLoadingFilePicker,
    clear,
  } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator([
        "jpg",
        "png",
        "jpeg",
        "webp",
        "heic",
        "heif",
        "bmp",
      ]),
      new FileSizeValidator({ maxFileSize: 5 * 1024 * 1024 }), // 5MB
    ],
  });

  const handlePersonaChange = (personaId: string) => {
    setSelectedPersona(personaId);
  };

  // Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint (768px)
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
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
        <div className="relative bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-4 pb-2">
          {filesContent.length > 0 && (
            <div className="mb-2 relative flex self-end w-fit">
              <Image
                src={filesContent[0].content}
                width={100}
                height={100}
                alt=""
                className="w-auto h-auto max-h-12 object-contain opacity-80 rounded-sm max-w-36"
              />
              <button
                type="button"
                onClick={clear}
                className="outline-none p-0.5 cursor-pointer rounded-full bg-neutral-200 absolute -top-1 -right-1 items-center"
              >
                <XIcon size={12} />
              </button>
            </div>
          )}

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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openFilePicker}
                disabled={isLoading || isLoadingFilePicker || !isAuthenticated}
                className="outline-none p-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ImageIcon size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <PersonaSelector
                onPersonaChange={handlePersonaChange}
                disabled={hasMessages}
              />
              <button
                name="submitButton"
                type="submit"
                disabled={
                  isLoading || !input.trim() || !isAuthenticated || isOverLimit
                }
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 ${
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
