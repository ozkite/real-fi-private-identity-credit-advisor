import type { TMessageAttachment } from "./schemas";

export interface ITextContent {
  type: "text";
  text: string;
}

export interface IImageContent {
  type: "image_url";
  image_url: {
    url: string;
  };
}

export type IChatMessageContent = ITextContent | IImageContent;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string | IChatMessageContent[];
  attachments?: TMessageAttachment[];
}
