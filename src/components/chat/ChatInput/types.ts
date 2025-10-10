import type { TLLMName } from "@/config/llm";

export interface ISendMessageParams {
  content: string;
  model?: TLLMName;
  shouldUseWebSearch?: boolean;
  attachmentData?: {
    imageDataUrl?: string;
    pdfData?: {
      useAsAttachedFile?: boolean;
      extractedTextContent?: string | null;
    };
  };
}

export interface IChatInputProps {
  onSendMessage: (message: ISendMessageParams) => void;
  isLoading: boolean;
  placeholder?: string;
  showActionButtons?: boolean;
}
