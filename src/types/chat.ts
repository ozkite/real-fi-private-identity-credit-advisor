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

export interface IChatMessage {
  role: "user" | "assistant";
  content: string | IChatMessageContent[];
  attachments?: TMessageAttachment[];
}

export interface IChatItem {
  _id: string;
  title: string;
  persona?: string;
}
