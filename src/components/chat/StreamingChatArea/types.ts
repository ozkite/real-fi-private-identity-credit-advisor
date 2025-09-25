import type { IChatMessage } from "@/types/chat";

export interface StreamingChatAreaProps {
  model: string;
  initialMessages?: IChatMessage[];
  chatId?: string | null;
  hasDecryptionFailures?: boolean;
}
