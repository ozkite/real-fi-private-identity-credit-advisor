export interface USER_SCHEMA {
  _id: string;
  provider: string;
  created_at: string;
}

export interface CHAT_SCHEMA {
  _id: string;
  creator: string;
  title?: {
    "%allot": string;
  };
  created_at?: string;
  updated_at?: string;
  message_count: number;
  persona?: string;
}

export type TMessageAttachment = "image" | "pdf" | "csv" | "audio";

export interface MESSAGES_SCHEMA {
  _id: string;
  chat_id: string;
  creator: string;
  role: string;
  content: {
    "%allot": string;
  };
  order: string;
  timestamp: string;
  model: string;
  signature: string;
  token_count?: string;
  attachments?: TMessageAttachment[];
  pwa?: boolean;
}
