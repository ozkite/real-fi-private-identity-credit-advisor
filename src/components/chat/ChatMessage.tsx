"use client";

import Image from "next/image";
import type React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { IChatMessage } from "../../types/chat";
import getMessageAttachmentIcon from "../../utils/getMessageAttachmentIcon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface ChatMessageProps {
  message: IChatMessage;
  isStreaming?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isStreaming = false,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        // Reset to copy icon after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  const isUser = message.role === "user";

  const bubbleClasses = `
    rounded-tl-2xl rounded-tr rounded-br-2xl rounded-bl-2xl px-6 py-3 max-w-[80%] sm:max-w-[75%] lg:max-w-[65%]
    break-words overflow-wrap-anywhere
    ${isUser ? "bg-white text-black" : "bg-transparent text-black"}
  `;

  const markdownProseClasses = `
    ${isUser ? "prose prose-invert text-black" : "prose"}
      prose-sm sm:prose-base
      max-w-none
      break-words overflow-wrap-anywhere
  `;

  return (
    <>
      {message.attachments && message.attachments.length > 0 && (
        <div className="flex gap-1 items-center !-mb-2 ml-auto w-fit">
          <span className="text-neutral-500 text-xs">Attached</span>
          <div className="flex gap-1 items-center">
            {message.attachments.map((attachment) => {
              const AttachmentIcon = getMessageAttachmentIcon(attachment);
              return (
                <div key={attachment}>
                  <AttachmentIcon size={12} className="text-neutral-500" />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
        <div className={bubbleClasses}>
          <div className={markdownProseClasses}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content as string}
            </ReactMarkdown>
          </div>

          {message.sources && message.sources.length > 0 && (
            <HoverCard openDelay={300}>
              <HoverCardTrigger>
                <span className="cursor-pointer text-neutral-500 text-sm hover:underline">
                  Sources
                </span>
              </HoverCardTrigger>
              <HoverCardContent align="start">
                <div className="flex mt-2 space-x-2 flex-col">
                  <span className="text-neutral-500 text-sm">
                    Sources used to generate this response:
                  </span>

                  <ol className="list-decimal list-inside">
                    {message.sources.map(({ source }) => {
                      if (!source.startsWith("http")) {
                        return null;
                      }

                      const sourceUrl = new URL(source);
                      const sourceDomain = sourceUrl.hostname;
                      return (
                        <li key={source}>
                          <a
                            href={source}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="text-neutral-500 text-sm hover:underline">
                              {sourceDomain}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}

          {!isUser &&
            (isStreaming ? (
              <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1 align-text-bottom" />
            ) : (
              message.content && (
                <div className="flex mt-2 space-x-2">
                  <button
                    onClick={() => copyToClipboard(message.content as string)}
                    className="p-1 text-neutral-500 hover:text-neutral-700"
                    title={isCopied ? "Copied!" : "Copy to clipboard"}
                  >
                    <Image
                      src={
                        isCopied ? "/img/tick_icon.svg" : "/img/copy-icon.png"
                      }
                      width={12}
                      height={12}
                      alt={isCopied ? "copied" : "copy-icon"}
                    />
                  </button>
                </div>
              )
            ))}
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
